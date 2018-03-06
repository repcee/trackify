const Constants = {
    userType: {
        student: 'student',
        professor: 'professor'
    },
    statusCode: {
        n: {
            name: "Normal",
            description: "Normal status."
        },
        h: {
            name: "Holiday",
            description: "Holiday status."
        },
        c: {
            name: "Cancelled",
            description: "Class/attendance was cancelled by the teacher."
        },
        o: {
            name: "Other",
            description: "Other status."
        }
    },

    attendanceStatus: {
        n: {
            name: "Normal",
            description: "Normal"
        },
        l: {
            name: "Late",
            description: "Student was late to check-in."
        },
        o: {
            name: "Other",
            description: "Other"
        }

    }
}

export default Constants;