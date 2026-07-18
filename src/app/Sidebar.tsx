"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
	{ href: "/dashboard/members", label: "Members" },
	{ href: "/dashboard/wars", label: "Current war" },
	{ href: "/dashboard/capital-assaults", label: "Capital assaults" },
	{ href: "/dashboard/league-tops", label: "League tops" },
];

function NavLinks({
	pathname,
	onNavigate,
}: {
	pathname: string;
	onNavigate?: () => void;
}) {
	return (
		<nav className="flex-1 p-4">
			<ul className="space-y-2">
				{navItems.map((item) => {
					const isActive =
						pathname === item.href ||
						(item.href !== "/dashboard" && pathname.startsWith(item.href));

					return (
						<li key={item.href}>
							<Link
								href={item.href}
								onClick={onNavigate}
								className={`block rounded-md px-3 py-2 transition-all duration-200 ${
									isActive
										? "bg-slate-700 text-white shadow-sm"
										: "text-slate-200 hover:-translate-y-0.5 hover:bg-slate-700 hover:text-white"
								}`}
							>
								{item.label}
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}

export default function Sidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-slate-700/90 bg-slate-950/95 px-4 text-white backdrop-blur md:hidden">
				<h1 className="text-base font-semibold">Clan Management</h1>
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="rounded-md border border-slate-600 px-3 py-1.5 text-sm font-medium transition-colors duration-200 hover:bg-slate-800"
					aria-label="Open navigation"
					aria-controls="mobile-sidebar"
					aria-expanded={isOpen}
				>
					Menu
				</button>
			</header>

			<aside className="fixed inset-y-0 left-0 hidden w-64 flex-col bg-slate-900 text-white md:flex">
				<div className="flex h-16 items-center justify-center border-b border-slate-700 bg-slate-900">
					<h1 className="text-lg font-semibold">Clan Management</h1>
				</div>
				<NavLinks pathname={pathname} />
			</aside>

			<div
				className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
					isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
				}`}
			>
				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="absolute inset-0 bg-black/60"
					aria-label="Close navigation"
				/>

				<aside
					id="mobile-sidebar"
					className={`relative z-10 flex h-full w-72 max-w-[85vw] flex-col bg-slate-900 text-white shadow-xl transition-transform duration-300 ease-out ${
						isOpen ? "translate-x-0" : "-translate-x-full"
					}`}
				>
					<div className="flex h-14 items-center justify-between border-b border-slate-700 bg-slate-900 px-4">
						<h2 className="text-base font-semibold">Navigation</h2>
						<button
							type="button"
							onClick={() => setIsOpen(false)}
							className="rounded-md border border-slate-600 px-2 py-1 text-sm transition-colors duration-200 hover:bg-slate-800"
							aria-label="Close menu"
						>
							Close
						</button>
					</div>
					<NavLinks pathname={pathname} onNavigate={() => setIsOpen(false)} />
				</aside>
			</div>
		</>
	);
}