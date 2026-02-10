export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="text-center">
                <div className="relative">
                    {/* Spinning heart animation */}
                    <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-pink-500 border-solid mx-auto mb-6"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                        💕
                    </div>
                </div>
                <p className="text-xl text-gray-700 font-medium animate-pulse">
                    Chargement de votre page...
                </p>
            </div>
        </div>
    );
}
