"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AromaticChemical } from "@/types/chemical"

export function useChemicals() {
  const [chemicals, setChemicals] = useState<AromaticChemical[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchChemicals() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("aromatic_chemicals")
          .select("*")
          .eq("is_system", true)
          .order("olfactive_note", { ascending: true })
          .order("name", { ascending: true })

        if (error) throw error

        const mappedChemicals: AromaticChemical[] = (data || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          casNumber: item.cas_number,
          olfactiveFamily: item.olfactive_family,
          olfactiveNote: item.olfactive_note,
          description: item.description,
          minDosage: item.min_dosage,
          maxDosage: item.max_dosage,
          ifraLimit: item.ifra_limit,
          density: item.density,
          isSolid: item.is_solid,
          defaultDilutionPct: item.default_dilution_pct,
          defaultDilutionSolvent: item.default_dilution_solvent,
          isSystem: item.is_system,
          userId: item.user_id,
          createdAt: item.created_at,
        }))

        setChemicals(mappedChemicals)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar químicos")
      } finally {
        setLoading(false)
      }
    }

    fetchChemicals()
  }, [])

  return { chemicals, loading, error }
}

export function useChemicalsByNote(note: "topo" | "coracao" | "fundo") {
  const { chemicals, loading, error } = useChemicals()
  const filtered = chemicals.filter((c) => c.olfactiveNote === note)
  return { chemicals: filtered, loading, error }
}
