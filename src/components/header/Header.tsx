import { Link } from "react-router-dom";
import { LogoSimcc } from "../svg/LogoSimcc";
import { Separator } from "../ui/separator";
import { useContext} from "react";

import { cn } from "../../lib"
import * as React from "react"



import logo_4 from '../../assets/logo_4.png';
import logo_4_white from '../../assets/logo_4_white.png';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "../../components/ui/navigation-menu"
import { ChartLine, GraduationCap, ListDashes, SignIn, Textbox, UserPlus } from "phosphor-react";
import { GitBranch } from "lucide-react";
import { UserContext } from "../../context/context";
import { Button } from "../ui/button";
import { UserConfigHeader } from "./user-config-header";

import { useTheme } from "next-themes"
import { LogoWhite } from "../svg/LogoWhite";
export function Header() {
  const {loggedIn} = useContext(UserContext)

  const { theme } = useTheme()

    return(
        <header className="h-20 z-[99]  flex justify-between  items-center mr-[72px] ">
            <div className=" w-full flex items-center h-12 gap-4">
            <div className="flex gap-2 items-center h-full justify-center ">
            <Link to={"/"} className="h-[24px]  " >{theme == 'dark' ? (<LogoWhite />):(<LogoSimcc />)}</Link>

            <Separator orientation="vertical" />

            <Link to={""} target="_blank" className=" whitespace-nowrap "><img src={theme == 'dark' ? (logo_4_white):(logo_4)} alt="" className="whitespace-nowrap flex flex-1 h-[24px]" /></Link>
            </div>

            <NavigationMenu className="xl:flex hidden">
                <NavigationMenuList>
                <NavigationMenuItem>
                <Link to="/indicadores" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <ChartLine size={16} className="" /> Indicadores
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
          <NavigationMenuTrigger><ListDashes size={16} />Explorar</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                 
                  >
                  <ListDashes size={24} />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Explorar
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Conheça a plataforma e tudo que ela tem a oferecer
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dicionario" title="Dicionário">
                Veja todos os termos disponíveis na plataforma
              </ListItem>
              <ListItem href="/docs/installation" title="Revistas">
               Listagem das revistas com o Qualis e JCR
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Sobre o projeto">
                Descubra o passo a passo de como utilizar a plataforma
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger><GraduationCap size={16} /> Pós-graduação</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  
                  >
                  <GraduationCap size={24} />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Pós-graduação
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Selecione um programa de pós e tenha uma visão dos docentes e produções
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dicionario" title="Explorar">
                Veja todos os programas das universidades pelo mapa
              </ListItem>
              <ListItem href="indicadores-pos-graduacao" title="Indicadores">
                Painel de indicadores das pós-graduações
              </ListItem>
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
                <Link to="/baremas" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Textbox size={16} className="" /> Baremas
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                <Link to="/taxonomia" >
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <GitBranch size={16} className="rotate-180" /> Taxonomia
                    </NavigationMenuLink>
                </Link>
                </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            </div>

            <div className="flex gap-2 items-center">
              {!loggedIn && (
                <Link to={''}><Button variant={'outline'}><UserPlus size={16} className="" />Criar conta</Button></Link>
              )}

            {!loggedIn && (
                <Link to={'signIn'}><Button variant={'default'} className="text-white h-10 dark:text-white"><SignIn size={16} className="" />Fazer login</Button></Link>
            )}

          {loggedIn && (
                <UserConfigHeader/>
            )}

            </div>

        </header>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"