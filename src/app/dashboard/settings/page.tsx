"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/hooks/use-auth'
import { handleNumericInput, parseNumericValue } from '@/lib/utils/number-input'

export default function SettingsPage() {
  const router = useRouter()
  const { user, profile } = useAuth()
  const [fullName, setFullName] = useState('')
  const [nickname, setNickname] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('iniciante')
  const [defaultMode, setDefaultMode] = useState('volume')
  const [defaultMacerationDays, setDefaultMacerationDays] = useState(30)
  const [dropsPerMl, setDropsPerMl] = useState(20)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setNickname(profile.nickname || '')
      setExperienceLevel(profile.experience_level || 'iniciante')
      setDefaultMode(profile.default_calculation_mode || 'volume')
      setDefaultMacerationDays(profile.default_maceration_days || 30)
      setDropsPerMl(profile.drops_per_ml || 20)
    }
  }, [profile])

  const handleSaveProfile = async () => {
    if (!user) return

    setSaving(true)
    setMessage('')
    setError('')

    try {
      const supabase = createClient()
      const updateData = {
        full_name: fullName,
        nickname: nickname || null,
        experience_level: experienceLevel,
        default_calculation_mode: defaultMode,
        default_maceration_days: defaultMacerationDays,
        drops_per_ml: dropsPerMl,
      }
      const { error } = await (supabase as any)
        .from('profiles')
        .update(updateData)
        .eq('id', user.id)

      if (error) throw error

      setMessage('Perfil atualizado com sucesso!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar perfil')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem')
      return
    }

    setChangingPassword(true)
    setMessage('')
    setError('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      setMessage('Senha alterada com sucesso!')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setMessage(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Erro ao alterar senha')
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmation = prompt('Digite "EXCLUIR" para confirmar a exclusão permanente da sua conta:')
    
    if (confirmation !== 'EXCLUIR') {
      return
    }

    if (!confirm('Tem certeza? Esta ação não pode ser desfeita!')) {
      return
    }

    try {
      const supabase = createClient()
      
      // Delete user data
      if (user?.id) {
        await supabase.from('recipes').delete().eq('user_id', user.id)
        await supabase.from('profiles').delete().eq('id', user.id)
      }
      
      // Sign out and redirect
      await supabase.auth.signOut()
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir conta')
    }
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6">⚙️ Configurações</h1>

        {message && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg text-sm mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        {/* Profile */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>👤 Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome completo</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Apelido</Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Como prefere ser chamado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="opacity-50 cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">O email não pode ser alterado</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Nível de experiência</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                <SelectTrigger id="experience">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iniciante">Iniciante</SelectItem>
                  <SelectItem value="intermediario">Intermediário</SelectItem>
                  <SelectItem value="avancado">Avançado</SelectItem>
                  <SelectItem value="profissional">Profissional</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              {saving ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🔒 Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova senha (mínimo 6 caracteres)</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button 
              onClick={handleChangePassword}
              disabled={changingPassword || !newPassword}
              variant="outline"
            >
              {changingPassword ? 'Alterando...' : 'Alterar senha'}
            </Button>
          </CardContent>
        </Card>

        {/* Calculator Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🧪 Preferências da Calculadora</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultMode">Modo padrão</Label>
              <Select value={defaultMode} onValueChange={setDefaultMode}>
                <SelectTrigger id="defaultMode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="volume">Volume (ml)</SelectItem>
                  <SelectItem value="drops">Gotas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="macerationDays">Meta de maceração padrão (dias)</Label>
              <Input
                id="macerationDays"
                type="text"
                inputMode="decimal"
                value={defaultMacerationDays}
                onChange={(e) => setDefaultMacerationDays(parseNumericValue(e.target.value) || 30)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dropsPerMl">Unidade de gotas (gotas/ml)</Label>
              <Input
                id="dropsPerMl"
                type="text"
                inputMode="decimal"
                value={dropsPerMl}
                onChange={(e) => setDropsPerMl(parseNumericValue(e.target.value) || 20)}
              />
            </div>

            <Button 
              onClick={handleSaveProfile}
              disabled={saving}
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            >
              {saving ? 'Salvando...' : 'Salvar preferências'}
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-500/50">
          <CardHeader>
            <CardTitle className="text-red-400">🗑️ Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser desfeita.
            </p>
            <Button 
              onClick={handleDeleteAccount}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir minha conta
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
