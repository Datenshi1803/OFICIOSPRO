import { Check, X } from "lucide-react"
import { getPasswordRequirements } from "@/lib/validations"

interface PasswordStrengthIndicatorProps {
  password: string
  showDetails?: boolean
}

export function PasswordStrengthIndicator({ password, showDetails = true }: PasswordStrengthIndicatorProps) {
  const requirements = getPasswordRequirements(password)

  const checks = [
    { label: "Mínimo 8 caracteres", met: requirements.minLength },
    { label: "Una mayúscula (A-Z)", met: requirements.hasUpperCase },
    { label: "Una minúscula (a-z)", met: requirements.hasLowerCase },
    { label: "Un número (0-9)", met: requirements.hasNumber },
    { label: "Un carácter especial (!, @, #, $, etc.)", met: requirements.hasSpecialChar },
  ]

  if (!showDetails) {
    return null
  }

  return (
    <div className="space-y-2 mt-2">
      {checks.map((check) => (
        <div key={check.label} className="flex items-center gap-2 text-sm">
          {check.met ? (
            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
          ) : (
            <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
          )}
          <span className={check.met ? "text-green-600 font-medium" : "text-muted-foreground"}>
            {check.label}
          </span>
        </div>
      ))}
    </div>
  )
}
