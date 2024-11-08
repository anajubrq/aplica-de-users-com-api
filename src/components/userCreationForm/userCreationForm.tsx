import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { withMask } from 'use-mask-input';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface UserCreationFormProps {
  isOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const userRegisterSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'O campo nome precisa ser preenchido' }),
  cpf: z.string().min(11, { message: 'O campo CPF precisa ser preenchido' }),
  cep: z.string().min(8, { message: "O campo CEP precisa ser preenchido" }),
  neighborhood: z.string().min(1, { message: "O campo bairro precisa ser preenchido" }),
  city: z.string().min(1, { message: "O campo cidade precisa ser preenchido" }),
  street: z.string().min(1, { message: "O campo rua precisa ser preenchido" }),
  dateBirth: z.string().min(1, { message: "O campo data de nascimento precisa ser preenchido" })
});

export type UserRegister = z.infer<typeof userRegisterSchema>;

export default function UserCreationForm({ isOpen, setModalOpen }: UserCreationFormProps) {
  const form = useForm<UserRegister>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: { cep: "", name: "", dateBirth: "", neighborhood: "", street: "", cpf: "", city: "" }
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control
  } = form;

  const [address, setAddress] = React.useState({ city: '', neighborhood: '', street: '' });
  const [isFieldsDisabled, setIsFieldsDisabled] = React.useState(false);

  const sendUserData = async (data: UserRegister) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users', data);
      console.log('User successfully registered on the API:', response);
      setModalOpen(false);  
      reset();  
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  
  const onSubmit: SubmitHandler<UserRegister> = (data) => {
    console.log("Form sent with data:", data);
    sendUserData(data);
  };

  React.useEffect(() => {
    if (!isOpen) {
      reset();
      setAddress({ city: '', neighborhood: '', street: '' });
      setIsFieldsDisabled(false);
    }
  }, [isOpen, reset]);

  console.log(form.formState.errors)
  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="flex justify-center items-center w-full h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-[22px]">Add customer</CardTitle>
            <CardDescription>Fill in the information below:</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField control={control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name </FormLabel>
                    <FormControl>
                      <Input id="name" placeholder="Customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={control} name="cpf" render={({ field }) => (
                  <FormItem>
                    <FormLabel> CPF </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="cpf"
                        render={({ field }) => (
                          <Input
                            id="cpf"
                            placeholder="Enter your CPF"
                            {...field}
                            ref={withMask('999.999.999-99')}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={control} name="cep" render={({ field }) => (
                  <FormItem>
                    <FormLabel> CEP </FormLabel>
                    <FormControl>
                      <Controller
                        control={control}
                        name="cep"
                        render={({ field }) => (
                          <Input
                            id="cep"
                            placeholder="Enter your CEP"
                            {...field}
                            ref={withMask('99999-999')}
                          />
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={control} name="city" render={({ field }) => (
                  <FormItem>
                    <FormLabel> City </FormLabel>
                    <FormControl>
                      <Input id="city" placeholder="Enter your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={control} name="neighborhood" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Neighborhood </FormLabel>
                    <FormControl>
                      <Input id="neighborhood" placeholder="Digite seu bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={control} name="street" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Rua </FormLabel>
                    <FormControl>
                      <Input id="street" placeholder="Digite sua rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={control} name="dateBirth" render={({ field }) => (
                  <FormItem>
                    <FormLabel> Date of birth </FormLabel>
                    <FormControl>
                      <Input id="dateBirth" type="date" placeholder="Digite sua data de nascimento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <div className="flex justify-center items-center gap-[40px]">
                  <Button type="submit" disabled={isSubmitting} className="mt-4">
                    Send
                  </Button>

                  <Button type="button" className="mt-4" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
