import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { GET, POST } from './assets/utils';
import AddModal from './components/AddModal'
import Page from './components/Page';

function App() {
  const [items, setItems] = useState(GET());
  const [page, setPage] = useState("inventory")
  const [modal, setModal] = useState(null)
  const shoppingList = useMemo(() => {
    return items.filter(i => i.amount < i.target)
  }, [items])

  useEffect(() => {
    POST(items.sort((a, b) => a.name.localeCompare(b.name)))
    setItems(p => p.sort((a, b) => a.name.localeCompare(b.name)))
  }, [items])

/* Create Item */
  function createItem(e) {
    e.preventDefault()

    let name = e.target.name.value.trim()
    
    if(!name.includes(":")) {
      name = `Other: ${name}`
    }

    let newItem = {
      id: new Date().toISOString(),
      name,
      amount: e.target.onHand.value,
      target: e.target.target.value
    }

    setItems(p => [...p, newItem])
    // e.target.reset()
    setModal(null)
  }

// Shopping
  function handleShopping(e) {
    e.preventDefault()

    setItems(p => p.map(i => {
      if(!e.target[i.id]) return i
      return {
        ...i,
        amount: parseFloat(i.amount) + parseFloat(e.target[i.id].value || 0)
      }
    }))
  }

// Currently Using
  function handleUsing(e) {
    e.preventDefault()

    setItems(p => p.map(i => {
      return {
        ...i,
        amount: parseFloat(i.amount) - parseFloat(e.target[i.id].value || 0)
      }
    }))
  }

/* Show Header */
  function showHeader(obj, index, array = items) {
    if(!obj.name.includes(":")) {
      return
    }
    if(index === 0 || !array[index-1].name.includes(obj.name.split(":")[0])) {
      return (<h2>{obj.name.split(":")[0]}s</h2>)
    }
  }

  return (
    <>
    {/* Create Item Modal */}
      {modal && <AddModal 
        onClose={() => setModal(null)}
        onSubmit={createItem}
      />}

    {/* The Website */}
      <header>
        <div className="header-pages">
          <h1>Inventory Manager</h1>
          <div className="header-pages-actions">
            <button className={`bttn-nav ${page === "inventory" ? "bttn-nav-active" : ""}`} onClick={() => setPage("inventory")}>Inventory</button>
            <button className={`bttn-nav ${page === "use" ? "bttn-nav-active" : ""}`} onClick={() => setPage("use")}>Use Item</button>
            <button className={`bttn-nav ${page === "shop" ? "bttn-nav-active" : ""}`} onClick={() => setPage("shop")}>Needing Items</button>
          </div>
        </div>
        <button className="bttn bttn-primary" onClick={() => setModal(true)}>Create New Item</button>
      </header>
      <main>
        {page === "inventory" && (
          <Page title="Inventory" action={() => setModal(true)} actionText="Create New Item" headers={["", "Currently On Hand", "Minimum"]} pageClass="inventory-item">
            {items && items.map((i, index) => {

              function handleInput(e) {
                setItems(p => p.map(j => {
                  if(j.id !== i.id) return j
                  return { ...j, target: e.target.value}
                }))
              }

              return (
                <>
                {showHeader(i, index)}
                <div className="inventory-item" key={i.id}>
                  <p className="inventory-item-title">{i.name.split(": ")[1]}</p>
                  <p className="inventory-item-onHand">{i.amount}</p>
                  <input type="number" value={i.target} onChange={handleInput} />
                </div>
                </>
              )
            })}
          </Page>
        )}
        {page === "use" && (
          <form onSubmit={handleUsing}>
            <Page title="Currently Using" action="submit" actionText="Update Inventory" headers={["", "Currently On Hand", "Using"]} pageClass="inventory-item">
              {items && items.map((i, index) => {

                return (
                  <>
                  {showHeader(i, index)}
                  <div className="inventory-item">
                    <p className="inventory-item-title">{i.name.split(": ")[1]}</p>
                    <p className="inventory-item-onHand">{i.amount}</p>
                    <input type="number" name={i.id} placeholder="0" step="1" />
                  </div>
                  </>
                )
              })}
            </Page>
          </form>
        )}
        {page === "shop" && (
          <form onSubmit={handleShopping}>
            <Page title="Shopping List" action="submit" actionText="Checkout" headers={["", "Need", "Received"]} pageClass="inventory-item">
              {shoppingList && shoppingList.map((i, index) => {

                return (
                  <>
                  {showHeader(i, index, shoppingList)}
                  <div className="inventory-item">
                    <p className="inventory-item-title">{i.name.split(": ")[1]}</p>
                    <p className="inventory-item-onHand">{i.target - i.amount}</p>
                    <input type="number" name={i.id} placeholder="0" step="1" />
                  </div>
                  </>
                )
              })}
            </Page>
          </form>
        )}
      </main>
    </>
  )
}

export default App
