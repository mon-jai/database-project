import { getUserFromSession } from "@/lib/utils"
import Link from "next/link"

function NavbarButton({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <Link href={href}>
      <div style={{ padding: "0.5rem" }}>
        <span
          className="material-symbols-outlined"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem",
            aspectRatio: "1 / 1"
          }}
        >
          {icon}
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0.5rem",
            aspectRatio: "1 / 1"
          }}
        >
          {label}
        </div>
      </div>
    </Link>
  )
}

export default async function Navbar() {
  const user = await getUserFromSession({ select: { avatar: true } })

  return (
    <div
      style={{ padding: "1rem 0", boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.15)" }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "32px", color: "#59ab6e", fontWeight: "500" }}>網路商店</div>
        <div style={{ height: "48px", display: "flex" }}>
          <NavbarButton icon="search" label="Search" href="/search" />
          <NavbarButton icon="shopping_cart" label="Search" href="/search" />
          <NavbarButton icon="order_approve" label="Search" href="/search" />

          {user ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  aspectRatio: "1 / 1",
                  marginRight: "-0.5rem"
                }}
              >
                <img
                  src={user.avatar}
                  style={{ width: "100%", height: "100%", borderRadius: "1000px", objectFit: "cover" }}
                />
              </div>
              <NavbarButton icon="signout" label="signout" href="/search" />
            </>
          ) : (
            <NavbarButton icon="signin" label="signin" href="/search" />
          )}
        </div>
      </div>
    </div>
  )
}
