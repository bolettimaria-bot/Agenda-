let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

const tableBody = document.getElementById('contactTableBody');
const totalCount = document.getElementById('totalCount');

function renderContacts(filter = "") {
    tableBody.innerHTML = "";
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
    
    filtered.forEach((contact, index) => {
        const row = `<tr>
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.phone}</td>
            <td>
                <button class="edit" onclick="editContact(${index})">Alterar</button>
                <button class="delete" onclick="deleteContact(${index})">Excluir</button>
            </td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    totalCount.innerText = filtered.length;
}

function saveContact() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!name || !email || !phone) return alert("Preencha todos os campos!");

    const contactData = { name, email, phone };

    if (editIndex !== null) {
        contacts[editIndex] = contactData;
        editIndex = null;
        document.getElementById('saveBtn').innerText = "Cadastrar";
    } else {
        contacts.push(contactData);
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
    clearInputs();
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    editIndex = index;
    document.getElementById('saveBtn').innerText = "Atualizar";
}

function filterContacts() {
    const val = document.getElementById('filterInput').value;
    renderContacts(val);
}

function clearInputs() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('phone').value = "";
}

// Initial load
renderContacts();