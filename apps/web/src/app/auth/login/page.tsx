import Link from 'next/link';
import { redirect } from 'next/navigation';
import { mdiFolderPlus, mdiLogin } from '@mdi/js';
import { Icon } from '@mdi/react';
import { loginServerFunction } from '@repo/nx-auth';
import { type LoginInputs } from '@repo/nx-auth/src/schema';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Separator,
} from '@repo/nx-ui-vendor';

export default function Login() {
  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle>Account Login</CardTitle>
            <CardDescription>Sign into your account</CardDescription>
          </div>
          <div>
            <Icon path={mdiLogin} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="pt-4">
        <form
          className="space-y-4"
          action={async (formData) => {
            'use server';
            const result = await loginServerFunction({
              email: formData.get('email'),
              password: formData.get('password'),
            } as LoginInputs);
            if (result.success) {
              redirect('/');
            } else {
              console.log(result);
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="Enter a password" type="password" />
          </div>
          <Button className="" type="submit">
            Login
          </Button>
        </form>
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Do not have an account?
        <Link
          href="/auth/register"
          className="hover:text-foreground/60 flex gap-1 transition-colors"
        >
          <Icon path={mdiFolderPlus} size={1} />
          Register
        </Link>
      </CardFooter>
    </Card>
  );
}
