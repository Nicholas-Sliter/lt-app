import React, { useState, useEffect } from 'react';


function useCourses(language: string | undefined | null) {
    const [courses, setCourses] = useState<string[]>([]);

    useEffect(() => {
        if (!language) {
            return;
        }
        fetch(`/api/languages/${language.toLowerCase()}/courses`)
            .then(res => res.json())
            .then(data => setCourses(data));
    }, [language]);

    return courses;

}

export default useCourses;