export const metadata = {
  title: "Merchandise | Noah Lynch",
  description: "Official merchandise from Noah Lynch",
};

export default function MerchPage() {
  return (
    <div className="w-full max-w-4xl mx-auto aspect-w-16 aspect-h-9 bg-black rounded-lg shadow-xl overflow-hidden">
      <iframe
        src="https://noahlynch.creator-spring.com/"
        className="w-full h-full border-0"
        title="Noah Lynch Merchandise"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
