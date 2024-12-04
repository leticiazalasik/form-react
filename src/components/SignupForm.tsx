// Declara que o código é executado no lado do cliente (React client-side)
"use client";

// Importa as dependências necessárias para o componente
import React, { useState } from "react"; // React e useState para gerenciamento de estado
import { Alert, AlertDescription } from "@/components/ui/alert"; // Componentes de alerta para exibir mensagens de sucesso/erro
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Componentes para estilizar o formulário
import { Loader2 } from "lucide-react"; // Ícone de loader para mostrar ao usuário quando a ação está sendo processada
import { FormErrors, UserData } from "@/types"; // Tipos personalizados para dados de formulário e erros

// Componente de formulário de cadastro
const SignupForm = () => {
    // Definição do estado para os dados do formulário
    const [formData, setFormData] = useState<UserData>({
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
    });

    // Definição do estado para armazenar erros do formulário
    const [errors, setErrors] = useState<FormErrors>({});

    // Definição do estado para verificar se está carregando (em processamento)
    const [isLoading, setIsLoading] = useState(false);

    // Definição do estado para o status de envio (sucesso, erro ou nulo)
    const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

    // Função de validação do formulário
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}; // Objeto que armazenará erros de validação

        // Validação do campo 'name'
        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
        } else if (formData.name.length < 3) {
            newErrors.name = "Nome deve ter pelo menos 3 caracteres";
        }

        // Validação do campo 'email'
        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Email inválido";
        }

        // Validação do campo 'cpf'
        if (!formData.cpf.trim()) {
            newErrors.cpf = "cpf é obrigatório";
        } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
            newErrors.cpf = "cpf inválido";
        }

        // Validação do campo 'password'
        if (!formData.password) {
            newErrors.password = "Senha é obrigatória";
        } else if (formData.password.length < 6) {
            newErrors.password = "Senha deve ter pelo menos 6 caracteres";
        }

        // Validação do campo 'confirmPassword'
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem";
        }

        // Atualiza o estado de erros com os novos erros encontrados
        setErrors(newErrors);

        // Retorna 'true' se não houver erros, caso contrário retorna 'false'
        return Object.keys(newErrors).length === 0;
    };

    // Função para simular o envio de dados para um backend (no caso, salva no localStorage)
    const saveData = async (data: UserData): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    localStorage.setItem("userData", JSON.stringify(data)); // Simula salvar no localStorage
                    resolve(); // Resolve a promise com sucesso
                } catch (error) {
                    reject(error); // Caso ocorra um erro, rejeita a promise
                }
            }, 3000); // Simula um delay de 3 segundos
        });
    };

    // Função chamada quando o formulário é enviado
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne o comportamento padrão de envio do formulário (recarregar página)

        // Se a validação do formulário falhar, não envia o formulário
        if (!validateForm()) return;

        setIsLoading(true); // Define o estado para carregando (indica que a requisição está sendo processada)
        setSubmitStatus(null); // Reseta o status do envio

        try {
            // Tenta salvar os dados e aguarda a resposta da função saveData
            await saveData(formData);
            setSubmitStatus("success"); // Se tudo correr bem, define o status de sucesso
            // Limpa o formulário após sucesso no envio
            setFormData({
                name: "",
                email: "",
                cpf: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            setSubmitStatus("error"); // Se ocorrer erro, define o status como erro
        } finally {
            setIsLoading(false); // Finaliza o estado de carregamento, independentemente do sucesso ou erro
        }
    };

    // Função para atualizar os dados do formulário quando o usuário digitar
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // Desestrutura o nome e o valor do input
        setFormData((prev) => ({
            ...prev, // Mantém os valores anteriores do formulário
            [name]: value, // Atualiza o valor do campo específico
        }));
    };

    // Renderiza o componente de formulário com validação, campos de entrada e mensagens de erro
    return (
        <Card className="w-full max-w-md mx-auto">
            {/* Cabeçalho do card */}
            <CardHeader>
                <CardTitle>Cadastro de Usuário</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Campo de nome */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                     {/* Campo de cpf */}
                     <div>
                        <label className="block text-sm font-medium mb-1">CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.cpf ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.cpf && (
                            <p className="text-red-500 text-sm mt-1">{errors.cpf}</p>
                        )}
                    </div>

                    {/* Campo de email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Campo de senha */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Senha</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.password ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Campo de confirmação de senha */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded-md ${
                                errors.confirmPassword ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Botão de envio do formulário */}
                    <button
                        type="submit"
                        disabled={isLoading} // Desabilita o botão enquanto está carregando
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            "Cadastrar"
                        )}
                    </button>

                    {/* Mensagens de sucesso e erro */}
                    {submitStatus === "success" && (
                        <Alert className="bg-green-50 border-green-500">
                            <AlertDescription className="text-green-700">
                                Cadastro realizado com sucesso!
                            </AlertDescription>
                        </Alert>
                    )}

                    {submitStatus === "error" && (
                        <Alert className="bg-red-50 border-red-500">
                            <AlertDescription className="text-red-700">
                                Erro ao realizar cadastro. Tente novamente.
                            </AlertDescription>
                        </Alert>
                    )}
                </form>
            </CardContent>
        </Card>
    );
};

// Exporta o componente para ser usado em outro lugar no projeto
export default SignupForm;
