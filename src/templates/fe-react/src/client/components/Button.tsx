/**
 * @ai-context Styled button with variants: primary, secondary, ghost, danger.
 * Props: variant, size, disabled, onClick, children.
 */
export default function Button({ variant = 'primary', size = 'md', children, ...props }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  );
}
