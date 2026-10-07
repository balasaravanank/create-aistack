import { forwardRef } from 'react';

/**
 * @ai-context Form input with label, validation error display, and forwarded ref.
 * Props: label, error, type, placeholder, ...inputProps.
 */
const Input = forwardRef(function Input({ label, error, ...props }, ref) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input ref={ref} className={`input ${error ? 'input-error' : ''}`} {...props} />
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
});

export default Input;
