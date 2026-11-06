import { Link } from 'react-router-dom'

const styles = {
  primary: 'button-primary',
  secondary: 'glass text-ink hover:bg-ink/10',
}

export default function Button({ to, href, variant = 'primary', className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>
  return <a href={href} className={cls} {...rest}>{children}</a>
}
