import { getUserFromSession } from "@/lib/utils"
import Link from "next/link"

const buttonStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0.5rem",
  aspectRatio: "1 / 1"
}

export default async function Navbar() {
  const user = await getUserFromSession({ avatar: true })

  return (
    <div
      style={{ padding: "1rem 0", boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.15)" }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontSize: "32px", color: "#59ab6e", fontWeight: "500" }}>網路商店</div>
        <div style={{ height: "48px", display: "flex" }}>
          <span className="material-symbols-outlined" style={buttonStyle}>
            search
          </span>
          <span className="material-symbols-outlined" style={buttonStyle}>
            shopping_cart
          </span>
          <span className="material-symbols-outlined" style={buttonStyle}>
            order_approve
          </span>
          {user ? (
            <div style={{ ...buttonStyle, marginRight: "-0.5rem" }}>
              <img
                src={user.avatar}
                style={{ width: "100%", height: "100%", borderRadius: "1000px", objectFit: "cover" }}
              />
            </div>
          ) : (
            <Link href="/signin" />
          )}
        </div>
      </div>
    </div>
  )
}
