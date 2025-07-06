import './Button.css';

export default function Button({ children, onClick, disabled, variant }) {
  const className = `btn ${variant === 'cashout' ? 'btn-cashout' : 'btn-roll'}`;
  
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}