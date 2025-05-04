import { Link, useNavigate } from "react-router";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect } from "react";

const schema = z.object({
  name: z.string().nonempty("O campo nome é obrigatório"),
  email: z
    .string()
    .email("Insira um e-mail válido.")
    .nonempty("O campo e-mail é obrigatório."),
  password: z
    .string()
    .nonempty("O campo senha é obrigatório.")
    .min(8, "A senha deve ter pelo menos 8 caracteres."),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  async function handleLogin(data: FormData) {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user.user, {
        displayName: data.name,
      });
      toast.success("Usuário cadastrado com sucesso.");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error("Não foi possível criar conta.");
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-12">
      <h1 className="text-4xl font-bold text-center">
        <span className="text-indigo-500">Task</span> Manager
      </h1>
      <div className="w-full max-w-xl bg-white rounded-lg p-5 flex flex-col items-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="w-full flex flex-col mb-4"
        >
          <Input
            type="text"
            label="Nome"
            name="name"
            error={errors.name?.message}
            register={register}
          />
          <Input
            type="email"
            label="E-mail"
            name="email"
            error={errors.email?.message}
            register={register}
          />
          <Input
            type="password"
            label="Senha"
            name="password"
            error={errors.password?.message}
            register={register}
          />
          <button
            type="submit"
            className="w-full h-12 bg-indigo-500 text-lg text-white rounded-lg font-medium flex items-center justify-center cursor-pointer"
          >
            Criar Conta
          </button>
        </form>
        <Link to="/register" className="text-sm font-medium">
          Já possui uma conta?{" "}
          <span className="text-indigo-500">Faça login</span>
        </Link>
      </div>
    </div>
  );
}
