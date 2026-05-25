import Image from "next/image"

type Props = {}

const DashboardSnippet = (props: Props) => {
    return (
        <div className="relative py-20 flex justify-center items-center px-4">
            {/* Radial glow behind the image */}
            <div className="absolute w-3/4 h-1/2 rounded-[50%] bg-purple-600 opacity-20 blur-[120px] z-0" />

            {/* Outer glow ring */}
            <div className="relative z-10 w-full max-w-7xl rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-white/5 shadow-[0_0_80px_rgba(139,92,246,0.25)]">
                {/* Inner dark frame */}
                <div className="rounded-2xl overflow-hidden bg-black/60 backdrop-blur-sm">
                    {/* Top bar like a browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                        <span className="w-3 h-3 rounded-full bg-red-500/70" />
                        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                        <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>

                    {/* Dashboard image */}
                    <div className="w-full aspect-video relative">
                        <Image
                            priority
                            src="/dashboard-snippet.png"
                            className="opacity-95"
                            alt="Dashboard preview"
                            sizes="100vw"
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardSnippet