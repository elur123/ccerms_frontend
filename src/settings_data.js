function generateYear () {
    var max = new Date().getFullYear()
    var min = max - 10
    var years = []
    
    years.push({
        id: max + 1,
        label: max + 1
    })

    for (var i = max; i >= min; i--) {
        years.push({
            id: i,
            label: i
        })
    }
    return years
}

export const userTypes = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Research Coordinator' },
    { id: 3, label: 'Adviser' },
    { id: 4, label: 'Panel' },
    { id: 5, label: 'Subject Teacher' },
    { id: 7, label: 'Others' },
]

export const gender = [
    { id: 'Male', label: 'Male' },
    { id: 'Female', label: 'Female' }
]

export const status = [
    { id: 1, label: 'Pending' },
    { id: 2, label: 'Approved' },
    { id: 3, label: 'Declined' },
    { id: 4, label: 'Ongoing' },
    { id: 5, label: 'Accepted' },
    { id: 6, label: 'Minor' },
    { id: 7, label: 'Major' },
    { id: 8, label: 'Redefense' },
    { id: 9, label: 'Active' },
    { id: 10, label: 'Disband' },
]

export const groupTypes = [
    { id: 1, label: 'Capstone 1' },
    { id: 2, label: 'Capstone 2' },
    { id: 3, label: 'Done' }
]

export const semesters = [
    { id: '1st Semester', label: '1st Semester' },
    { id: '2nd Semester', label: '2nd Semester' }
]

export const years_list = generateYear();