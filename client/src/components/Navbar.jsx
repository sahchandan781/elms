import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";


const Navbar = () => {
  const {user} = useSelector(store => store.auth);
  const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate();
  
  const logoutHandler = async() => {
    await logoutUser();
  }
  
  
  useEffect(() => {
    if(isSuccess){
      toast.success(data.mesaage || "User logged Out.")
      navigate("/login")
    }
  },[isSuccess])

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}

      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
          <School size={"30"} className="" />
          <h1 className="hidden md:block font-extrabold text-2xl">
            <Link to="/">SkillEdgeX</Link>
          </h1>
        </div>
        {/* User Icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem><Link to='my-learning'>My Learning</Link></DropdownMenuItem>
                  <DropdownMenuItem><Link to="profile">Edit Profile</Link></DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
                
                {
                  user.role === "instructor" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>navigate("admin/dashboard")}>Dashboard</DropdownMenuItem>
                    </>
                  )
                }
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={()=>navigate("/login")}>Login</Button>
              <Button onClick={()=>navigate("/login")}>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl"><Link to="/">SkillEdgeX</Link></h1>
        <MobileNavbar user={user}/>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({user}) => {
  const navigate = useNavigate();
  const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
  const logoutHandler = async() => {
    await logoutUser();
  }
  useEffect(() => {
    if(isSuccess){
      toast.success(data.mesaage || "User logged Out.")
      navigate("/login")
    }
  },[isSuccess])
  const role = "instructor";
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-8">
          <SheetTitle>SkillEdgeX</SheetTitle>
          <DarkMode />
        </SheetHeader>
        <nav className="flex flex-col space-y-3 ml-5">
          
          {
            user ? (
             <> <span><Link to='my-learning'>My Learning</Link></span>
              <span><Link to="profile">Edit Profile</Link></span>
            <span><button onClick={logoutHandler} className="cursor-pointer">Log out</button></span> </>): (
              <span><button onClick={logoutHandler} className="cursor-pointer">Login</button></span>
            )
          }
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter className="mt-0">
            <SheetClose asChild>
            <Button type="submit" onClick={()=> navigate("/admin/dashboard")}>Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
