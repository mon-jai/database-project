import { getUserFromSession } from "@/lib/utils"
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
  const user = await getUserFromSession({ username: true, avatar: true, role: true })

  return (
    <div
      className="py-2"
      style={{ boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.15)" }}
    >
      <div className="container d-flex align-items-center" style={{ height: "48px" }}>
        <Link href="/" style={{ textDecoration: "none", marginRight: "1rem" }} className="fw-bold fs-3 text-success">
          網路商店
        </Link>
        {user && (
          <div className="d-flex">
            {user.role === "Customer" ? (
              <>
                <NavbarButton icon="shopping_cart" label="Shopping Cart" href="/shopping-cart" />
                <NavbarButton icon="order_approve" label="Orders" href="/orders" />
              </>
            ) : (
              <>
                <NavbarButton icon="category" label="Products" href="/admin/products" />
                <NavbarButton icon="sell" label="Coupons" href="/admin/coupons" />
                <NavbarButton icon="order_approve" label="Orders" href="/admin/orders" />
              </>
            )}
          </div>
        )}
        <div className="d-flex ms-auto" style={{ height: "100%" }}>
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
            <>
              <NavbarButton icon="person_add" label="signup" href="/signup" />
              <NavbarButton icon="login" label="signin" href="/signin" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
