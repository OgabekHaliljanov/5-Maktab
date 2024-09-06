function searchTable() {
    // Получаем значение поля ввода
    let input = document.getElementById("searchInput").value.toLowerCase();
    let table = document.getElementById("staffTable");
    let tr = table.getElementsByTagName("tr");

    // Перебираем строки таблицы, кроме заголовка
    for (let i = 1; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1]; // Ф.И.О. вторая колонка
        if (td) {
            let txtValue = td.textContent || td.innerText;
            if (txtValue.toLowerCase().indexOf(input) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
