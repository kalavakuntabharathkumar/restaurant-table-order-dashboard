import { useMemo, useState } from 'react'
import { Activity, Bell, ChefHat, ChevronDown, CircleCheck, Clock3, LayoutDashboard, Search, Settings, ShoppingBag, Users, Utensils, X } from 'lucide-react'

type OrderStatus = 'Preparing' | 'Ready' | 'Served'
type Order = { id: string; table: number; customer: string; items: string[]; total: number; status: OrderStatus; minutes: number }
const seed: Order[] = [
  { id: 'ORD-1048', table: 8, customer: 'Olivia Martin', items: ['Truffle mushroom pasta', 'Sparkling water'], total: 28.5, status: 'Preparing', minutes: 12 },
  { id: 'ORD-1047', table: 3, customer: 'Noah Williams', items: ['Classic cheeseburger', 'Fries'], total: 19, status: 'Ready', minutes: 8 },
  { id: 'ORD-1046', table: 12, customer: 'Emma Davis', items: ['Margherita pizza', 'Caesar salad'], total: 31, status: 'Preparing', minutes: 17 },
  { id: 'ORD-1045', table: 5, customer: 'Liam Brown', items: ['Grilled salmon', 'Lemon soda'], total: 34, status: 'Served', minutes: 24 },
  { id: 'ORD-1044', table: 2, customer: 'Ava Wilson', items: ['Chicken ramen', 'Iced tea'], total: 22, status: 'Preparing', minutes: 6 },
  { id: 'ORD-1043', table: 7, customer: 'Ethan Taylor', items: ['Garden bowl', 'Cold brew'], total: 18.5, status: 'Ready', minutes: 11 }
]
const money = (n: number) => `$${n.toFixed(2)}`
export default function App() {
  const [orders, setOrders] = useState<Order[]>(seed)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All orders')
  const [activeNav, setActiveNav] = useState('Overview')
  const [showNew, setShowNew] = useState(false)
  const [customer, setCustomer] = useState('')
  const [table, setTable] = useState('4')
  const [items, setItems] = useState('Chef special')
  const [notice, setNotice] = useState('')
  const filtered = useMemo(() => orders.filter(o => (filter === 'All orders' || o.status === filter) && `${o.id} ${o.customer} ${o.table}`.toLowerCase().includes(query.toLowerCase())), [orders, filter, query])
  const updateStatus = (id: string) => setOrders(old => old.map(o => o.id === id ? { ...o, status: o.status === 'Preparing' ? 'Ready' : o.status === 'Ready' ? 'Served' : 'Preparing' } : o))
  const addOrder = () => {
    if (!customer.trim() || !items.trim()) { setNotice('Enter a customer name and at least one item.'); return }
    const id = `ORD-${1049 + orders.length - seed.length}`
    setOrders(old => [{ id, table: Number(table) || 1, customer: customer.trim(), items: items.split(',').map(s => s.trim()).filter(Boolean), total: 24, status: 'Preparing', minutes: 1 }, ...old])
    setShowNew(false); setCustomer(''); setItems('Chef special'); setNotice('New order added successfully.')
    window.setTimeout(() => setNotice(''), 2600)
  }
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Utensils size={19}/></div><div><strong>tableflow</strong><small>RESTAURANT OS</small></div></div>
      <div className="workspace"><div className="restaurant-avatar">B</div><div><strong>Bistro & Co.</strong><small>Downtown location</small></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      {[[LayoutDashboard,'Overview'],[ShoppingBag,'Orders'],[Utensils,'Tables'],[Users,'Customers'],[Activity,'Analytics']].map(([Icon, label]: any) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => setActiveNav(label)}><Icon size={17}/><span>{label}</span>{label === 'Orders' && <em>8</em>}</button>)}
      <div className="nav-bottom"><button className="nav-item" onClick={() => setActiveNav('Settings')}><Settings size={17}/><span>Settings</span></button><div className="profile"><div className="profile-pic">JD</div><div><strong>Jordan Davis</strong><small>Restaurant manager</small></div><ChevronDown size={15}/></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> {activeNav}</div><div className="top-actions"><span className="live-dot">Live updates</span><button className="icon-button" aria-label="Notifications" onClick={() => setNotice('You are all caught up.')}><Bell size={18}/><i/></button><div className="top-avatar">JD</div></div></header>
      <div className="page-content">
        <div className="page-heading"><div><div className="eyebrow">SATURDAY, OCTOBER 24, 2026</div><h1>{activeNav === 'Overview' ? 'Good afternoon, Jordan' : activeNav}</h1><p>Here’s what’s happening at your restaurant today.</p></div><button className="primary-btn" onClick={() => setShowNew(true)}>＋ <span>New order</span></button></div>
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-top"><span>Orders today</span><div className="stat-icon purple"><ShoppingBag size={17}/></div></div><div className="stat-number">{orders.length + 126}<span className="trend">↗ 12.8%</span></div><div className="stat-foot">Compared to last Saturday</div><div className="spark purple-spark"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
          <div className="stat-card"><div className="stat-top"><span>Avg. order time</span><div className="stat-icon orange"><Clock3 size={17}/></div></div><div className="stat-number">5.2 <small>min</small><span className="trend">↘ 18.4%</span></div><div className="stat-foot">Faster than last week</div><div className="spark orange-spark"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
          <div className="stat-card"><div className="stat-top"><span>Active tables</span><div className="stat-icon green"><Utensils size={17}/></div></div><div className="stat-number">18<span className="muted-number"> / 24</span></div><div className="stat-foot"><span className="mini-dot"/> 6 tables available</div><div className="table-progress"><span/></div></div>
          <div className="stat-card"><div className="stat-top"><span>Revenue today</span><div className="stat-icon blue"><Activity size={17}/></div></div><div className="stat-number">$4,820<span className="trend">↗ 8.2%</span></div><div className="stat-foot">Across 132 completed orders</div><div className="revenue-bars">{[34,49,40,68,51,80,59,95,67,78,53,88,72,100,76,89].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></div>
        </div>
        <section className="orders-panel">
          <div className="panel-heading"><div><h2>Recent orders <span className="count-pill">{orders.length}</span></h2><p>Keep track of orders coming through the kitchen.</p></div><button className="outline-btn" onClick={() => {setFilter('All orders'); setQuery('')}}>View all orders <span>↗</span></button></div>
          <div className="order-controls"><div className="search-box"><Search size={16}/><input placeholder="Search orders, customers..." value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button onClick={()=>setQuery('')}><X size={14}/></button>}</div><div className="filter-tabs">{['All orders','Preparing','Ready','Served'].map(s=><button key={s} className={filter===s?'selected':''} onClick={()=>setFilter(s)}>{s}</button>)}</div></div>
          <div className="table-wrap"><table><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEMS</th><th>TABLE</th><th>AMOUNT</th><th>STATUS</th><th></th></tr></thead><tbody>
          {filtered.map(o=><tr key={o.id}><td><strong className="order-id">{o.id}</strong><small className="subline">{o.minutes} min ago</small></td><td><div className="customer-cell"><div className={`customer-avatar avatar-${o.table%4}`}>{o.customer.split(' ').map(s=>s[0]).join('')}</div><strong>{o.customer}</strong></div></td><td><div className="item-list">{o.items.map((it,i)=><span key={it}>{it}{i < o.items.length-1?', ':''}</span>)}</div></td><td><span className="table-chip">Table {o.table}</span></td><td><strong>{money(o.total)}</strong></td><td><span className={`status ${o.status.toLowerCase()}`}><i/>{o.status}</span></td><td><button className="more-btn" title="Advance order status" onClick={()=>updateStatus(o.id)}>•••</button></td></tr>)}
          {filtered.length===0 && <tr><td colSpan={7} className="empty">No orders match your search.</td></tr>}
          </tbody></table></div>
          <div className="panel-footer"><span>Showing <strong>{filtered.length}</strong> of <strong>{orders.length}</strong> active orders</span><div><button disabled>←</button><button className="page-active">1</button><button disabled>2</button><button disabled>→</button></div></div>
        </section>
        <div className="bottom-grid"><section className="bottom-card"><div className="bottom-title"><div><h3>Kitchen activity</h3><p>Orders being prepared right now</p></div><span className="live-tag"><i/> LIVE</span></div><div className="activity-row"><div className="activity-icon"><ChefHat size={18}/></div><div className="activity-copy"><strong>Kitchen is running smoothly</strong><small>3 orders in preparation · Avg. 5.2 min</small></div><CircleCheck size={18} className="check"/></div><div className="activity-meter"><span/></div><div className="meter-labels"><span>Kitchen capacity</span><strong>68%</strong></div></section><section className="bottom-card"><div className="bottom-title"><div><h3>Popular items</h3><p>Most ordered this week</p></div><button className="text-btn" onClick={()=>setActiveNav('Analytics')}>See report ↗</button></div>{[['🍔','Classic cheeseburger','142 orders'],['🍕','Margherita pizza','118 orders'],['🥗','Caesar salad','96 orders']].map(([emoji,name,count])=><div className="popular-row" key={name}><span className="food-emoji">{emoji}</span><strong>{name}</strong><small>{count}</small></div>)}</section></div>
      </div>
    </main>
    {notice && <div className="toast"><CircleCheck size={17}/>{notice}<button onClick={()=>setNotice('')}><X size={14}/></button></div>}
    {showNew && <div className="modal-backdrop" onClick={()=>setShowNew(false)}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><div><h2>Create new order</h2><p>Add a customer order to the kitchen queue.</p></div><button className="icon-button" onClick={()=>setShowNew(false)}><X size={18}/></button></div><label>Customer name<input value={customer} onChange={e=>setCustomer(e.target.value)} placeholder="e.g. Alex Morgan"/></label><label>Table number<input type="number" min="1" max="24" value={table} onChange={e=>setTable(e.target.value)}/></label><label>Items <small>Separate multiple items with commas</small><input value={items} onChange={e=>setItems(e.target.value)} placeholder="Burger, fries, lemonade"/></label><div className="modal-actions"><button className="outline-btn" onClick={()=>setShowNew(false)}>Cancel</button><button className="primary-btn" onClick={addOrder}>Create order</button></div></div></div>}
  </div>
}
