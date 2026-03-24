const StatCard = ({ label, value, helper }) => {
  return (
    <div className="glass-card rounded-3xl p-5 ringed">
      <p className="text-xs uppercase tracking-[0.2em] text-ink/50">{label}</p>
      <p className="text-2xl font-display mt-3">{value}</p>
      {helper && <p className="text-xs text-ink/50 mt-1">{helper}</p>}
    </div>
  );
};

export default StatCard;
