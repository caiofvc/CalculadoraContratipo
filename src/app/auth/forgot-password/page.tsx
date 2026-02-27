"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setSuccess(true)
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de recuperação")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <a
            href="https://www.youtube.com/@ClubedosContratipos"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 transition-transform hover:scale-105"
          >
            <img
              src="https://yt3.ggpht.com/8afy2kWNTu08oUBXlSEs0Gv-DOTzkACh1kI87-L0KYXikywx6XtGg5-HOplbsWFZd36SnXV0HQ=s600-c-k-c0x00ffffff-no-rj-rp-mo"
              alt="Clube dos Contratipos"
              className="w-20 h-20 rounded-full object-cover ring-[3px] ring-purple-500 shadow-[0_0_24px_rgba(167,139,250,0.3)]"
            />
          </a>
          <h1 className="text-2xl font-bold">Recuperar senha</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enviaremos um link para redefinir sua senha
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleResetPassword} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg text-sm">
              ✅ Email enviado! Verifique sua caixa de entrada.
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
            disabled={loading || success}
          >
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Lembrou a senha?{" "}
            <Link
              href="/auth/login"
              className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              Fazer login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
