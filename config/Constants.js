const Constants = {
    "statusCode": {
        "n": {
            "name": "Normal",
            "description": "Normal status."
        },
        "h": {
            "statusCodeId": "h",
            "name": "Holiday",
            "description": "Holiday status."
        },
        "c": {
            "statusCodeId": "c",
            "name": "Cancelled",
            "description": "Class/attendance was cancelled by the teacher."
        },
        "o": {
            "statusCodeId": "o",
            "name": "Other",
            "description": "Other status."
        }
    },

    "attendanceStatus": {
        "n": {
            "statusCodeId": "n",
            "name": "Normal",
            "description": "Normal"
        },
        "l": {
            "statusCodeId": "l",
            "name": "Late",
            "description": "Student was late to check-in."
        },
        "o": {
            "statusCodeId": "o",
            "name": "Other",
            "description": "Other"
        }

    }
}

export default Constants;