"use client"; // Añade esta línea

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { InputLogin } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@/components/ui/toast'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    console.log('Login attempt', { username, password })
    toast({
      title: "Intento de inicio de sesión",
      description: `Usuario: ${username}`,
      action: (
        <ToastAction altText="Try again">Intentar de nuevo</ToastAction>
      ),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <InputLogin
          id="username"
          type="text"
          icon='bxs:user'
          placeholder='Nombre de usuario'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <InputLogin
          id="password"
          type="password"
          icon='mdi:password'
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="text-sm">
        <a href="#" className="w-full flex justify-end hover:underline">
          ¿Olvidaste la contraseña?
        </a>
      </div>
      <Button type="submit" className="w-80 h-12 text-base text-white font-bold bg-primary hover:bg-chart-6">
        Iniciar sesión
      </Button>
      <div className="text-sm text-center">
        ¿Cuenta no registrada?{' '}
        <a href="#" className="text-primary hover:underline">
          Crea una cuenta
        </a>
      </div>
    </form>
  )
}