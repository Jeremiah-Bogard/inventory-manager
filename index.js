// ====  Data  ====
let data = JSON.parse(localStorage.getItem("inventoryManager")) || []
let groups = JSON.parse(localStorage.getItem("inventoryManager-groups")) || []

let currPage = 1

function updateStore() {
	localStorage.setItem("inventoryManager", JSON.stringify(data))

	console.log(data)

	groups = [...new Set(groups)]

	localStorage.setItem("inventoryManager-groups", JSON.stringify(groups))
}

// ====  Shopping  ====
const shopList = document.querySelector("#shopList")

function loadShop() {
	let sortGrp = groups.sort((a, b) => a.localeCompare(b))
	shopList.innerHTML = ""

	if (data.filter((obj) => parseInt(obj.onHand) < parseInt(obj.min)).length <= 0) {
		shopList.innerHTML = `
            <div class='emptyList'>            
                <img src='./assets/shopping.svg' width='100px'>
                <p>You have all the items you need.</p>
            </div>`
		return
	}

	for (let i = 0; i < sortGrp.length; i++) {
		let grpItems = data
			.filter((obj) => obj.group === sortGrp[i] && parseInt(obj.onHand) < parseInt(obj.min))
			.sort((a, b) => a.name.localeCompare(b.name))

		if (grpItems.length > 0) {
			const listCat = document.createElement("div")
			listCat.classList.add("listCat")
			const listCatHead = document.createElement("div")
			listCatHead.classList.add("listCatHead")
			listCatHead.innerHTML = `
                    <h2>${sortGrp[i]}</h2>
                    <div class="legend">
                        <p>Name</p>
                        <p>Minimum</p>
                        <p>On Hand</p>
                        <p>Need</p>
                    </div>`

			listCat.appendChild(listCatHead)
			const listItems = document.createElement("div")
			listItems.classList.add("listItems")

			for (let j = 0; j < grpItems.length; j++) {
				const need =
					parseInt(grpItems[j].min) - parseInt(grpItems[j].onHand)
				const listItem = document.createElement("div")
				listItem.classList.add("listItem")
				listItem.innerHTML = `
                        <p>${grpItems[j].name}</p>
                        <p>${grpItems[j].min}</p>
                        <p>${grpItems[j].onHand}</p>
                        <p>${need}</p>
                        <button class="listItemBttn" onClick="toggleModal('grab', '${grpItems[j].id}')">Grab Item</button>`

				listItems.appendChild(listItem)
			}

			listCat.appendChild(listItems)
			shopList.appendChild(listCat)
		}
	}
}

// ====  Work Order  ====
const workOrder = document.querySelector("#workOrder")

function loadWorkOrder() {
	let sortGrp = groups.sort((a, b) => a.localeCompare(b))
	workOrder.innerHTML = ""

	if (data.length <= 0) {
		workOrder.innerHTML = `
            <div class='emptyList'>            
                <img src='./assets/work-order.svg' width='100px'>
                <p>You do not have any items yet.</p>
            </div>`
		return
	}

	for (let i = 0; i < sortGrp.length; i++) {
		const listCat = document.createElement("div")
		listCat.classList.add("listCat")
		const listCatHead = document.createElement("div")
		listCatHead.classList.add("listCatHead")
		listCatHead.innerHTML = `
                <h2>${sortGrp[i]}</h2>
                <div class="legend">
                    <p>Name</p>
                    <p>Minimum</p>
                    <p>On Hand</p>
                </div>`

		listCat.appendChild(listCatHead)
		const listItems = document.createElement("div")
		listItems.classList.add("listItems")

		let sortData = data
			.filter((obj) => obj.group === sortGrp[i])
			.sort((a, b) => a.name.localeCompare(b.name))

		for (let j = 0; j < sortData.length; j++) {
			const listItem = document.createElement("div")
			listItem.classList.add("listItem")
			listItem.innerHTML = `
                    <p>${sortData[j].name}</p>
                    <p>${sortData[j].min}</p>
                    <p>${sortData[j].onHand}</p>
                    <button class="listItemBttn" onClick="toggleModal('use', '${sortData[j].id}')">Use Item</button>`

			listItems.appendChild(listItem)
		}

		listCat.appendChild(listItems)
		workOrder.appendChild(listCat)
	}
}

// ====  Configuration  ====
const config = document.querySelector("#config")

function loadConfig() {
	let sortGrp = groups.sort((a, b) => a.localeCompare(b))
	config.innerHTML = ""

	if (data.length <= 0) {
		config.innerHTML = `
            <div class='emptyList'>            
                <img src='./assets/config.svg' width='100px'>
                <p>You do not have any items yet.</p>
            </div>`
		return
	}

	for (let i = 0; i < sortGrp.length; i++) {
		const listCat = document.createElement("div")
		listCat.classList.add("listCat")
		const listCatHead = document.createElement("div")
		listCatHead.classList.add("listCatHead")
		listCatHead.innerHTML = `
                <h2>${sortGrp[i]}</h2>
                <div class="legend">
                    <p>Name</p>
                    <p>Minimum</p>
                    <p>On Hand</p>
                </div>`

		listCat.appendChild(listCatHead)
		const listItems = document.createElement("div")
		listItems.classList.add("listItems")

		let sortData = data
			.filter((obj) => obj.group === sortGrp[i])
			.sort((a, b) => a.name.localeCompare(b.name))

		for (let j = 0; j < sortData.length; j++) {
			const listItem = document.createElement("div")
			listItem.classList.add("listItem")
			listItem.innerHTML = `
                    <p>${sortData[j].name}</p>
                    <p>${sortData[j].min}</p>
                    <p>${sortData[j].onHand}</p>
                    <button class="listItemBttn" onClick="toggleModal('modify', '${sortData[j].id}')">Modify Item</button>`

			listItems.appendChild(listItem)
		}

		listCat.appendChild(listItems)
		config.appendChild(listCat)
	}
}

// ====  Modal  ====
const modal = document.querySelector("#modalWrapper")
const modalTitle = document.querySelector("#modalTitle")
const modalForm = document.querySelector("#modalForm")
const modalSelect = document.querySelector("#group")
const modalPages = document.querySelectorAll(".modalPage")
const modalBttn = document.querySelector("#modalBttn")

function modalSubmit(e, opt, id) {
	e.preventDefault()

	const name = e.target.name.value.trim()
	const onHand = e.target.onHand.value
	const min = e.target.min.value
	const group = e.target.group.value
	const custGroup = e.target.custGroup.value.trim()
	const amount = e.target.amount.value

	if (
		((opt === "new" || opt === "modify") &&
			(name === "" || onHand === "" || min === "")) ||
		((opt === "grab" || opt === "use") && amount === "")
	) {
		return
	}

	if (opt === "new" || opt === "modify") {
		const itemSchema = {
			id: new Date().toISOString(),
			name,
			onHand,
			min,
			group: custGroup !== "" ? custGroup : group,
		}
		if (opt !== "new") {
			data = data.filter((obj) => obj.id !== id)
		}

		data.push(itemSchema)

		if (!groups.includes(itemSchema.group)) {
			groups.push(itemSchema.group)
		}
	} else {
		let item = data.filter((obj) => obj.id === id)[0]
		console.log(opt, "before:", item)

		if (opt === "grab") {
			item.onHand = parseInt(item.onHand) + parseInt(amount)
		} else {
			item.onHand = parseInt(item.onHand) - parseInt(amount)
		}

		console.log(opt, "After:", item)

		data = data.filter((obj) => obj.id !== id)
		data.push(item)
	}

	updateStore()
	toggleModal()
	changePage(currPage)
	modalForm.reset()
}

function toggleModal(opt, id) {
	if (!opt) {
		modal.style.display = "none"
		return
	}
	console.log("modal")

	modal.style.display = "flex"

	if (opt === "new" || opt === "modify") {
		modalPages[0].style.display = "block"
		modalPages[1].style.display = "none"

		modalSelect.innerHTML =
			opt === "new" ? "<option value='null'>Select a Group</option>" : ""

		for (let i = 0; i < groups.length; i++) {
			const option = document.createElement("option")
			option.value = groups[i]
			option.innerText = groups[i]
			modalSelect.appendChild(option)
		}
	} else {
		modalPages[1].style.display = "block"
		modalPages[0].style.display = "none"
	}

	const item =
		id !== undefined ? data.filter((obj) => obj.id === id)[0] : null

	console.log(item, id)

	switch (opt) {
		case "new":
			modalTitle.innerText = "New Item"
			modalBttn.innerText = "Create New Item"
			break
		case "modify":
			modalForm.name.value = item.name
			modalForm.min.value = item.min
			modalForm.onHand.value = item.onHand
			modalForm.group.value = item.group

			modalTitle.innerText = `Configure ${item.name}`
			modalBttn.innerText = "Modify Item"
			break
		case "grab":
			modalTitle.innerText = `Grab More ${item.name}`
			modalBttn.innerText = "Mark as Grabbed"
			break
		case "use":
			modalTitle.innerText = `Use an ${item.name}`
			modalBttn.innerText = "Mark as Used"
			break
	}

	modalForm.addEventListener("submit", (e) => modalSubmit(e, opt, id), {
		once: true,
	})
}

// ====  Navigation  ====
const navLinks = document.querySelectorAll(".navLink")
const pages = document.querySelectorAll(".page")

function changePage(num) {
	// ====  Update Nav Buttons  ====
	for (let i = 0; i < navLinks.length; i++) {
		if (i === num) {
			navLinks[i].classList.add("active")
		} else {
			navLinks[i].classList.remove("active")
		}
	}

	// ====  Update Page  ====
	for (let i = 0; i < pages.length; i++) {
		if (i === num) {
			pages[i].style.display = "block"
		} else {
			pages[i].style.display = "none"
		}
	}

	if (num === 0) {
		loadShop()
	} else if (num === 1) {
		loadWorkOrder()
	} else {
		loadConfig()
	}

	if(num !== currPage) window.scrollTo({ top: 0, behavior: "smooth" })
	currPage = num
}

changePage(currPage)

// Sync --nav-h to the actual rendered nav height
function syncNavHeight() {
	const nav = document.querySelector("nav")
	document.documentElement.style.setProperty(
		"--nav-h",
		nav.offsetHeight + "px",
	)
}
syncNavHeight()
window.addEventListener("resize", syncNavHeight)

console.log("loaded")
