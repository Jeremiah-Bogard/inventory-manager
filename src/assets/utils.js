export const POST = (data) => {
	localStorage.setItem("inventory-items", JSON.stringify(data))
}

export const GET = () => {
	if (!localStorage.getItem("inventory-items")) {
		POST([])
		return []
	}

	return JSON.parse(localStorage.getItem("inventory-items"))
}
