export const metadata = {
  title: "Merchandise | Noah Lynch",
  description: "Official merchandise from Noah Lynch",
};

export default function MerchPage() {
  return (
    <div className="aspect-w-16 aspect-h-9 mx-auto w-full max-w-4xl overflow-hidden rounded-lg bg-black shadow-xl">
      <iframe
        src="https://noahlynch.creator-spring.com/"
        className="h-full w-full border-0"
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
