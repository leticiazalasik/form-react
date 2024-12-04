"use client";
import Link from "next/link";
 
export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Projeto teste de formulários</h1>
                <p className="mb-4">
                    Se quiser abrir o formulário de cadastro clique no botão abaixo.
                </p>
                <Link
                    href="/signup"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Cadastrar-se
                </Link>
            </div>
        </div>
    );
}
 