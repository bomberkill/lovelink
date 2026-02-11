export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md">
                <div className="text-8xl mb-6 animate-bounce">💔</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    Page introuvable
                </h1>
                <p className="text-gray-600 mb-6">
                    Cette page d&apos;amour n&apos;existe pas ou a été supprimée.
                </p>
                <p className="text-sm text-gray-500">
                    Vérifiez le lien que vous avez reçu.
                </p>
            </div>
        </div>
    );
}
