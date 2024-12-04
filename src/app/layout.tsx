// Importa o tipo 'Metadata' do Next.js, que permite configurar as informações de metadados da página (como título e descrição)
import type { Metadata } from "next";

// Importa a fonte "Inter" do Google Fonts, com o subconjunto "latin" para suportar caracteres latinos
import { Inter } from "next/font/google";

// Importa o arquivo de estilos globais para a aplicação
import "./globals.css";

// Cria uma instância da fonte Inter, especificando que ela deve ter o subconjunto 'latin'
const inter = Inter({ subsets: ["latin"] });

// Define os metadados da página, como o título e a descrição, que serão usados pelo Next.js para otimizar o SEO e outros aspectos
export const metadata: Metadata = {
    title: "Formulário de Cadastro", // Título da página
    description: "Exemplo de formulário com Next.js e TypeScript", // Descrição da página
};

// Define o componente RootLayout que será usado para envolver a estrutura da página
// Esse componente é responsável por envolver os "children" (conteúdo da página) e aplicar estilos globais e fontes.
export default function RootLayout({
    children, // Recebe o conteúdo da página (geralmente os componentes ou conteúdo da página) como props
}: Readonly<{
    children: React.ReactNode; // Declara que o 'children' é do tipo React.ReactNode (pode ser qualquer elemento JSX)
}>) {
    return (
        // O componente 'html' define a estrutura básica do HTML, com a língua definida como inglês
        <html lang="en">
            {/* O 'body' aplica a fonte 'Inter' e uma classe CSS 'antialiased' para melhorar a renderização da fonte */}
            <body className={`${inter.className} antialiased`}>
                {/* Aqui são renderizados os filhos (conteúdo da página) dentro do 'body' */}
                {children}
            </body>
        </html>
    );
}
