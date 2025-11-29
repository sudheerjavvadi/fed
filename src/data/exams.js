// src/data/exams.js
// Centralized exam definitions per workshop and module

const defaultExam = {
    id: 'default-e1',
    title: 'General Module Quiz',
    questions: [
        { id: 'd-q1', text: 'What does UI stand for?', options: ['User Interface', 'Unified Input', 'Unique Identifier', 'User Integration'], correctAnswer: 'User Interface' },
        { id: 'd-q2', text: 'Which is a React hook?', options: ['useWatch', 'useState', 'useFetch', 'useRoute'], correctAnswer: 'useState' },
        { id: 'd-q3', text: 'What is semantic HTML useful for?', options: ['Styling', 'Accessibility', 'Faster JS', 'Bundling'], correctAnswer: 'Accessibility' },
    ]
};

const exams = {
    'wk-1': {
        '2': {
            id: 'wk1-m2',
            title: 'Module 2 Quiz: Context & State',
            questions: [
                { id: 'w1-q1', text: 'Which API is best for lightweight state sharing?', options: ['Redux', 'Context API', 'jQuery', 'Flux'], correctAnswer: 'Context API' },
                { id: 'w1-q2', text: 'Which hook avoids unnecessary re-renders?', options: ['useState', 'useEffect', 'useMemo', 'useRef'], correctAnswer: 'useMemo' },
                { id: 'w1-q3', text: 'What is a selector in state management?', options: ['A UI element', 'A function to derive state', 'An API call', 'A CSS rule'], correctAnswer: 'A function to derive state' },
                { id: 'w1-q4', text: 'When should you prefer Context over Redux?', options: ['Tiny apps', 'Large complex apps only', 'Never', 'Only for animations'], correctAnswer: 'Tiny apps' },
                { id: 'w1-q5', text: 'What does immutability help prevent?', options: ['Styling issues', 'Unexpected state mutations', 'Slower bundling', 'Missing props'], correctAnswer: 'Unexpected state mutations' },
            ]
        }
    },
    'wk-2': {
        '2': {
            id: 'wk2-m2',
            title: 'Module 2 Quiz: Wireframing & Prototyping',
            questions: [
                { id: 'w2-q1', text: 'What is the primary goal of wireframing?', options: ['Final UI polish', 'Define layout and flow', 'Write tests', 'Optimize images'], correctAnswer: 'Define layout and flow' },
                { id: 'w2-q2', text: 'Which fidelity is best for fast iteration?', options: ['High', 'Low', 'Production', 'None'], correctAnswer: 'Low' },
                { id: 'w2-q3', text: 'What tool is commonly used for interactive prototypes?', options: ['Figma', 'Node.js', 'Git', 'VS Code'], correctAnswer: 'Figma' },
                { id: 'w2-q4', text: 'What is a usability test used for?', options: ['Measure performance', 'Validate design with users', 'Compress images', 'Login flows only'], correctAnswer: 'Validate design with users' },
            ]
        }
    },
    'wk-3': {
        '2': {
            id: 'wk3-m2',
            title: 'Module 2 Quiz: Layouts & Grids',
            questions: [
                { id: 'w3-q1', text: 'What is the 8-point grid primarily used for?', options: ['Typography only', 'Consistent spacing', 'Routing', 'State management'], correctAnswer: 'Consistent spacing' },
                { id: 'w3-q2', text: 'Which CSS property controls layout flow?', options: ['display', 'color', 'font-size', 'alt'], correctAnswer: 'display' },
            ]
        }
    },
    'wk-4': {
        '1': {
            id: 'wk4-m1',
            title: 'Module 1 Quiz: Color & Typography',
            questions: [
                { id: 'w4-q1', text: 'What is the 8-point grid primarily used for?', options: ['Typography only', 'Consistent spacing', 'Routing', 'State management'], correctAnswer: 'Consistent spacing' },

            ]
        },
        '2': {
            id: 'wk4-m2',
            title: 'Module 2 Quiz: Layouts & Grids',
            questions: [
                { id: 'w4-q1', text: 'What is the 8-point grid primarily used for?', options: ['Typography only', 'Consistent spacing', 'Routing', 'State management'], correctAnswer: 'Consistent spacing' },
               
            ]
        }
    }
};

export function getExam(workshopId, moduleId) {
    return (exams[workshopId] && exams[workshopId][String(moduleId)]) || defaultExam;
}

export { defaultExam };
