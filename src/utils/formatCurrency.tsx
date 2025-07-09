export function formatCurrency(amount: number) {
  const formatted = `$${amount.toFixed(2)}`;
  return (
    <>
      {formatted} <span>USD</span>
    </>
  );
}
