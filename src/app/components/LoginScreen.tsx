import { useState } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.toLowerCase().endsWith('@udd.cl')) {
      setError('Solo se permiten correos institucionales @udd.cl');
      return;
    }
    if (!password) {
      setError('Ingresa tu contraseña');
      return;
    }
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#005B96] to-[#003D66] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-white text-4xl font-bold mb-2">Mi UDD</h1>
          <p className="text-white/80 text-lg">Universidad del Desarrollo</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="correo@udd.cl"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#005B96] focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#005B96] focus:outline-none transition-colors"
                required
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#005B96] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#004A7C] transition-colors shadow-lg"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-[#005B96] text-sm hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-white/70 text-sm">
          <p>© 2026 Universidad del Desarrollo</p>
        </div>
      </div>
    </div>
  );
}
