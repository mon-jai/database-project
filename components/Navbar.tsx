import { getSession, getUserFromSession } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"

function NavbarButton(props: { label: string; href: string } & ({ icon: string } | { iconNode: ReactNode })) {
  const iconNode =
    "iconNode" in props ? (
      props.iconNode
    ) : (
      <span
        className="material-symbols-outlined"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          aspectRatio: "1 / 1"
        }}
      >
        {props.icon}
      </span>
    )

  return (
    <Link
      href={props.href}
      style={{
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        color: "inherit",
        textDecoration: "none"
      }}
    >
      {iconNode}
      <div>{props.label}</div>
    </Link>
  )
}

export default async function Navbar() {
  const user = await getUserFromSession({ select: { username: true, avatar: true } })

  return (
    <div
      style={{ padding: "1rem 0", boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.15)" }}
    >
      <div className="container" style={{ height: "48px", display: "flex" }}>
        <Link
          href="/"
          style={{
            fontSize: "32px",
            color: "#59ab6e",
            fontWeight: "500",
            textDecoration: "none",
            marginRight: "2rem"
          }}
        >
          網路商店
        </Link>
        <div style={{ display: "flex", marginRight: "auto" }}>
          <NavbarButton icon="shopping_cart" label="Shopping Cart" href="/shopping-cart" />
          <NavbarButton icon="order_approve" label="Orders" href="/orders" />
        </div>
        <div style={{ display: "flex" }}>
          {user ? (
            <>
              <NavbarButton
                iconNode={
                  <img
                    src={user.avatar}
                    style={{
                      height: "100%",
                      aspectRatio: "1 / 1",
                      padding: "0.125rem",
                      borderRadius: "1000px",
                      objectFit: "cover"
                    }}
                  />
                }
                label={user.username}
                href="/edit-info"
              />
              <NavbarButton icon="logout" label="signout" href="/signout" />
            </>
          ) : (
            <NavbarButton icon="login" label="signin" href="/signin" />
          )}
        </div>
      </div>
    </div>
  )
}
