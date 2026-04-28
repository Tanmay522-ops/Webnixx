import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { cn } from '@/lib/utils';


const Navbar = ()=> {
    return (
        <nav className="w-full bg-black text-white px-8 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo and Navigation Links */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-black" />
                        </div>
                        <span className="text-xl">smartsales</span>
                    </div>

                    {/* Navigation Links */}
                    <NavigationMenu className="hidden md:flex" viewport={false}>
                        <NavigationMenuList className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#features"
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'bg-transparent text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full'
                                    )}
                                >
                                    Features
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#solutions"
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'bg-transparent text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full'
                                    )}
                                >
                                    Solutions
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#pricing"
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'bg-transparent text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full'
                                    )}
                                >
                                    Pricing
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    href="#user-stories"
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        'bg-transparent text-white hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full'
                                    )}
                                >
                                    User stories
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="text-white hover:bg-white/10 hover:text-white"
                    >
                        Log In
                    </Button>
                    <Button
                        variant="outline"
                        className="border-purple-500 border-3 text-white bg-transparent hover:bg-white hover:text-white rounded-full px-6 py-5"
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
            {/* Gradient divider line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/70 to-transparent mt-4" />
        </nav>
    );
}

export default Navbar