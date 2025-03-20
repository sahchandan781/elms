import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const handleChanges = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if(registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful!")
    }
    if(loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful!")
      navigate("/");
    }
    if(registerError) {
      toast.error(registerError.message || "Signup failed!")
    }
    if(loginError) {
      toast.error(loginError.message || "Login failed!")
    }
    
  }, [
    loginData,
    registerData,
    loginIsLoading,
    registerIsLoading,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex items-center justify-center mt-30">
      <Tabs defaultValue="signup" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Crete a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => handleChanges(e, "signup")}
                  name="name"
                  value={signupInput.name}
                  type="text"
                  placeholder="eg. Romeo"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => handleChanges(e, "signup")}
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="example@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Password</Label>
                <Input
                  onChange={(e) => handleChanges(e, "signup")}
                  name="password"
                  value={signupInput.password}
                  type="password"
                  placeholder="password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={(e) => handleChanges(e, "login")}
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="example@gmail.com"
                  required={true}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Password</Label>
                <Input
                  onChange={(e) => handleChanges(e, "login")}
                  name="password"
                  value={loginInput.password}
                  type="password"
                  placeholder="password"
                  required={true}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
