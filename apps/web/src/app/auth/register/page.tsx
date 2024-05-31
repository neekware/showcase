import Link from 'next/link';
import { mdiLogin } from '@mdi/js';
import { Icon } from '@mdi/react';
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

export default function Logout() {
  return (
    <Card className="mx-auto w-[350px] sm:w-[500px]">
      <CardHeader className="-mb-2.5 pt-4">
        <div className="flex">
          <div className="flex grow flex-col gap-1.5">
            <CardTitle>Account Registration</CardTitle>
            <CardDescription>Register a new account</CardDescription>
          </div>
          <div>
            <Icon path={mdiLogin} size={1.6} className="text-primary" />
          </div>
        </div>
      </CardHeader>
      <Separator orientation="horizontal" />
      <CardContent className="py-4">
        <form className="space-y-4">
          <div className="flex flex-col gap-y-4 sm:grid sm:grid-cols-2 sm:gap-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="Enter your phone number" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="Enter a password" type="password" />
          </div>
          <Button className="" type="submit">
            Register
          </Button>
        </form>
      </CardContent>
      <Separator orientation="horizontal" />
      <CardFooter className="-mb-2 flex justify-between pt-4">
        Already have an account?
        <Link href="/auth/login" className="hover:text-foreground/60 flex gap-1 transition-colors">
          <Icon path={mdiLogin} size={1} />
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
