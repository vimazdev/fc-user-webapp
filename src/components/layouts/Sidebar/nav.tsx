import type { ReactNode } from "react";

import { AiFillHome } from "react-icons/ai";
import { MdAccountBalance } from "react-icons/md";
import { TbBusinessplan } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaRegNewspaper } from "react-icons/fa6";
import { IoPulseSharp } from "react-icons/io5";
import { FaMousePointer } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

interface SidebarItem {
    label: string;
    href: string;
    icon: ReactNode;
    private?: boolean;
  }
  
interface SidebarCategory {
    category: string;
    items: SidebarItem[];
  }
  
type SidebarMenu = SidebarCategory[];

export const nav: SidebarMenu  = [
    {
        "category": "General",
        "items": [
            {
                "label": "Dashboard",
                "href": "/dashboard",
                "icon": <AiFillHome />
            },
            {
                "label": "Wallet",
                "href": "/wallet",
                "icon": <MdAccountBalance />
            },
            {
                "label": "Planes",
                "href": "/planes",
                "icon": <TbBusinessplan />
            }
        ]
    },
    {
        "category": "Formación",
        "items": [
            {
                "label": "Campus Virtual",
                "href": "/campus",
                "icon": <FaGraduationCap />,
                "private": true,
            },
            {
                "label": "Biblioteca",
                "href": "/biblioteca",
                "icon": <FaBook />,
                "private": true,
            },
            {
                "label": "Noticias",
                "href": "/noticias",
                "icon": <FaRegNewspaper />,
                "private": true,
            }
        ]
    },
    {
        "category": "Servicios",
        "items": [
            {
                "label": "Señales",
                "href": "/senales",
                "icon": <IoPulseSharp />,
                "private": true,
            },
            {
                "label": "Copy Trading",
                "href": "/copy-trading",
                "icon": <FaMousePointer />,
                "private": true,
            }
        ]
    },
    {
        "category": "Afiliación",
        "items": [
            {
                "label": "Afiliados",
                "href": "/afiliados",
                "icon": <FaUsers />
            }
        ]
    }
]