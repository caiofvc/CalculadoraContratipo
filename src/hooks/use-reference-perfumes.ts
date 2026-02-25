"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ReferencePerfume, ReferencePerfumeNote, ReferencePerfumeWithNotes, PerfumeSearchFilters } from "@/types/reference-perfume"

export function useReferencePerfumes(filters?: PerfumeSearchFilters) {
  const [perfumes, setPerfumes] = useState<ReferencePerfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPerfumes() {
      try {
        setLoading(true)
        const supabase = createClient()
        
        let query = supabase
          .from("reference_perfumes")
          .select("*")
          .eq("is_active", true)

        // Aplicar filtros
        if (filters?.gender && filters.gender !== 'all') {
          query = query.eq("gender", filters.gender)
        }

        if (filters?.olfactiveFamily) {
          query = query.eq("olfactive_family", filters.olfactiveFamily)
        }

        if (filters?.brand) {
          query = query.eq("brand", filters.brand)
        }

        if (filters?.query) {
          query = query.or(`name.ilike.%${filters.query}%,brand.ilike.%${filters.query}%`)
        }

        // Ordenação
        const sortBy = filters?.sortBy || 'popularity'
        if (sortBy === 'popularity') {
          query = query.order("popularity_score", { ascending: false })
        } else if (sortBy === 'name') {
          query = query.order("name", { ascending: true })
        } else if (sortBy === 'year') {
          query = query.order("year_launched", { ascending: false, nullsFirst: false })
        }

        const { data, error } = await query

        if (error) throw error

        const mappedPerfumes: ReferencePerfume[] = (data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          yearLaunched: item.year_launched,
          perfumer: item.perfumer,
          gender: item.gender,
          olfactiveFamily: item.olfactive_family,
          olfactiveSubfamily: item.olfactive_subfamily,
          concentrationType: item.concentration_type,
          description: item.description,
          imageUrl: item.image_url,
          popularityScore: item.popularity_score,
          isActive: item.is_active,
          isSystem: item.is_system,
          userId: item.user_id,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        }))

        setPerfumes(mappedPerfumes)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar perfumes")
      } finally {
        setLoading(false)
      }
    }

    fetchPerfumes()
  }, [filters?.query, filters?.gender, filters?.olfactiveFamily, filters?.brand, filters?.sortBy])

  return { perfumes, loading, error }
}

export function usePerfumeWithNotes(perfumeId: string | null) {
  const [perfume, setPerfume] = useState<ReferencePerfumeWithNotes | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!perfumeId) {
      setPerfume(null)
      return
    }

    async function fetchPerfumeWithNotes() {
      try {
        setLoading(true)
        const supabase = createClient()

        // Buscar perfume
        const { data: perfumeData, error: perfumeError } = await supabase
          .from("reference_perfumes")
          .select("*")
          .eq("id", perfumeId as string)
          .single()

        if (perfumeError) throw perfumeError

        // Buscar notas
        const { data: notesData, error: notesError } = await supabase
          .from("reference_perfume_notes")
          .select("*")
          .eq("perfume_id", perfumeId as string)
          .order("sort_order", { ascending: true })

        if (notesError) throw notesError

        // Mapear perfume
        const perfumeDataAny = perfumeData as any
        const mappedPerfume: ReferencePerfume = {
          id: perfumeDataAny.id,
          name: perfumeDataAny.name,
          brand: perfumeDataAny.brand,
          yearLaunched: perfumeDataAny.year_launched,
          perfumer: perfumeDataAny.perfumer,
          gender: perfumeDataAny.gender,
          olfactiveFamily: perfumeDataAny.olfactive_family,
          olfactiveSubfamily: perfumeDataAny.olfactive_subfamily,
          concentrationType: perfumeDataAny.concentration_type,
          description: perfumeDataAny.description,
          imageUrl: perfumeDataAny.image_url,
          popularityScore: perfumeDataAny.popularity_score,
          isActive: perfumeDataAny.is_active,
          isSystem: perfumeDataAny.is_system,
          userId: perfumeDataAny.user_id,
          createdAt: perfumeDataAny.created_at,
          updatedAt: perfumeDataAny.updated_at,
        }

        // Mapear notas
        const mappedNotes: ReferencePerfumeNote[] = (notesData || []).map((item: any) => ({
          id: item.id,
          perfumeId: item.perfume_id,
          chemicalId: item.chemical_id,
          olfactiveNote: item.olfactive_note,
          chemicalName: item.chemical_name,
          suggestedChemical: item.suggested_chemical,
          suggestedPct: item.suggested_pct,
          isKeyNote: item.is_key_note,
          sortOrder: item.sort_order,
          notes: item.notes,
          createdAt: item.created_at,
        }))

        // Organizar notas por tipo
        const perfumeWithNotes: ReferencePerfumeWithNotes = {
          ...mappedPerfume,
          notes: {
            topo: mappedNotes.filter(n => n.olfactiveNote === 'topo'),
            coracao: mappedNotes.filter(n => n.olfactiveNote === 'coracao'),
            fundo: mappedNotes.filter(n => n.olfactiveNote === 'fundo'),
          }
        }

        setPerfume(perfumeWithNotes)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar detalhes do perfume")
      } finally {
        setLoading(false)
      }
    }

    fetchPerfumeWithNotes()
  }, [perfumeId])

  return { perfume, loading, error }
}
