export interface ValidationResult {
  isValid: boolean
  message: string
}

// Dominios de correo permitidos (¡Ojo! Asegúrate de que realmente quieres bloquear otros dominios en el front)
const ALLOWED_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
  'protonmail.com', 'icloud.com', 'mail.com', 'aol.com', 'oficiospro.com'
]

/**
 * Validar Nombre Completo
 */
export function validateNombre(value: string): ValidationResult {
  if (!value) return { isValid: false, message: 'El nombre es obligatorio' }

  // Verificar espacios al inicio o al final sin alterar la UX del trim automático
  if (value.startsWith(' ') || value.endsWith(' ')) {
    return { isValid: false, message: 'No debe comenzar o terminar con espacios' }
  }

  // Permite letras, acentos, eñes y un solo espacio intermedio
  const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/
  if (!nameRegex.test(value)) {
    return { isValid: false, message: 'Solo se permiten letras y un espacio entre palabras' }
  }

  return { isValid: true, message: 'Nombre válido' }
}

/**
 * Validar Correo Electrónico
 */
export function validateEmail(value: string): ValidationResult {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'El correo es obligatorio' }
  }

  // Estándar W3C para emails robustos
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  if (!emailRegex.test(value)) {
    return { isValid: false, message: 'Formato de correo inválido' }
  }

  const domain = value.split('@')[1].toLowerCase()
  if (!ALLOWED_EMAIL_DOMAINS.includes(domain)) {
    return { isValid: false, message: 'Dominio de correo no permitido' }
  }

  return { isValid: true, message: 'Correo válido' }
}

/**
 * Validar Teléfono Móvil (Panamá)
 */
export function validateTelefono(value: string): ValidationResult {
  if (!value) return { isValid: false, message: 'El teléfono es obligatorio' }

  // 4 dígitos, guion, 4 dígitos
  const telefonoRegex = /^\d{4}-\d{4}$/
  if (!telefonoRegex.test(value)) {
    return { isValid: false, message: 'Formato requerido: 0000-0000' }
  }

  return { isValid: true, message: 'Teléfono válido' }
}

/**
 * Validar Ubicación
 */
export function validateUbicacion(value: string): ValidationResult {
  if (!value || !value.trim()) {
    return { isValid: false, message: 'La ubicación es obligatoria' }
  }

  if (/^\d/.test(value.trim())) {
    return { isValid: false, message: 'La ubicación no puede iniciar con números' }
  }

  // Permitimos letras, números, espacios, comas, puntos y guiones para direcciones reales
  const allowed = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,-]+$/
  if (!allowed.test(value)) {
    return { isValid: false, message: 'Solo se permiten letras, números, espacios, comas, puntos y guiones' }
  }

  return { isValid: true, message: 'Ubicación válida' }
}

/**
 * Validar Contraseña (Strong Password)
 */
export function validatePassword(value: string): ValidationResult {
  if (!value) return { isValid: false, message: 'La contraseña es obligatoria' }
  if (value.length < 8) return { isValid: false, message: 'Mínimo 8 caracteres' }
  if (!/[A-Z]/.test(value)) return { isValid: false, message: 'Debe contener al menos una mayúscula' }
  if (!/[a-z]/.test(value)) return { isValid: false, message: 'Debe contener al menos una minúscula' }
  if (!/\d/.test(value)) return { isValid: false, message: 'Debe contener al menos un número' }
  
  // CORRECCIÓN: Validación de carácter especial agregada
  if (!/[!@#$%^&*(),.?":{}|<>\-_]/.test(value)) {
    return { isValid: false, message: 'Debe contener al menos un carácter especial (ej: !, @, #, $)' }
  }

  return { isValid: true, message: 'Contraseña fuerte' }
}

/**
 * Obtener requisitos de contraseña (para validación visual)
 */
export function getPasswordRequirements(value: string) {
  return {
    minLength: value.length >= 8,
    hasUpperCase: /[A-Z]/.test(value),
    hasLowerCase: /[a-z]/.test(value),
    hasNumber: /\d/.test(value),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>\-_]/.test(value),
  }
}

/**
 * Verificar si contraseña cumple todos los requisitos
 */
export function isPasswordValid(value: string): boolean {
  const req = getPasswordRequirements(value)
  return req.minLength && req.hasUpperCase && req.hasLowerCase && req.hasNumber && req.hasSpecialChar
}

/**
 * Validar Confirmación de Contraseña
 */
export function validatePasswordConfirm(password: string, confirm: string): ValidationResult {
  if (!confirm) return { isValid: false, message: 'Confirmar contraseña es obligatorio' }
  if (password !== confirm) return { isValid: false, message: 'Las contraseñas no coinciden' }
  return { isValid: true, message: 'Contraseñas coinciden' }
}

/**
 * Validar Cédula Panameña (Soporta formatos Regulares y Especiales)
 */
export function validateCedula(value: string): ValidationResult {
  if (!value) return { isValid: false, message: 'La cédula es obligatoria' }

  const cedula = value.trim().toUpperCase()

  // Validar formato general usando Regex
  // Soporta: Provincias (1-8, PE, E, N, AV, PI) seguidas de guiones y números
  const cedulaRegex = /^([1-8]|PE|E|N|AV|PI)-\d{1,4}-\d{1,6}$/
  
  if (!cedulaRegex.test(cedula)) {
    return { isValid: false, message: 'Formato de cédula inválido (ej: 8-888-8888, PE-123-456)' }
  }

  return { isValid: true, message: 'Cédula válida' }
}

/**
 * Filtro para Nombre
 */
export function filterNombre(value: string): string {
  let filtered = value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '')
  filtered = filtered.replace(/\s{2,}/g, ' ')
  return filtered // Se sugiere no hacer trimStart aquí para permitir que el usuario use la barra espaciadora temporalmente
}

/**
 * Filtro para Teléfono
 */
export function filterTelefono(value: string): string {
  const digits = value.replace(/\D/g, '').substring(0, 8)
  if (digits.length <= 4) return digits
  return `${digits.substring(0, 4)}-${digits.substring(4)}`
}

/**
 * Filtro para Cédula
 */
export function filterCedula(value: string): string {
  // Permitir letras válidas para cédulas especiales de Panamá y números/guiones
  let filtered = value.toUpperCase().replace(/[^0-9-PEAVN]/g, '')
  
  // Evitar guiones múltiples seguidos
  filtered = filtered.replace(/-{2,}/g, '-')

  const parts = filtered.split('-')
  if (parts.length > 3) {
    filtered = `${parts[0]}-${parts[1]}-${parts.slice(2).join('')}`
  }
  
  return filtered.substring(0, 15)
}

/**
 * Validar campo obligatorio general
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} es obligatorio` }
  }
  return { isValid: true, message: '' }
}