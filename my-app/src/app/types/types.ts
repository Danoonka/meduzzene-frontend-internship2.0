export interface User {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string;
    user_status: string;
    user_city: string;
    user_phone: string;
    user_links: string[];
}

export interface UserForList {
    user_id: number;
    user_avatar: string;
    user_firstname: string;
    user_lastname: string;
    action_id: number
}

export const initialCurrentUserState: User = {
    user_id: -1,
    user_email: '',
    user_firstname: '',
    user_lastname: '',
    user_avatar: '',
    user_status: '',
    user_city: '',
    user_phone: '',
    user_links: [
        ''
    ]
};

export interface userToEdit {
    user_firstname: string,
    user_lastname: string,
    user_avatar: string | null,
    user_status: string,
    user_city: string,
    user_phone: number
}

export interface PaginationInfoState {
    current_page: number,
    total_page: number,
    total_results: number
}

export interface UserToSignUp {
    user_email: string,
    user_password: string,
    user_firstname: string,
    user_lastname: string

}

export interface CompanyForList {
    company_id: number,
    company_name: string,
    company_avatar: string,
    action_id: number,
    owner_id: number
}

export interface CompanyById {
    company_id: number,
    company_name: string,
    company_description: string,
    company_avatar: string,
    owner_id: number
}

export interface CompanyToCreate {
    company_name: string,
    company_description: string
}

export interface Question {
    question_id: number,
    question_text: string,
    question_answers: string[],
    question_correct_answer: number
}

export interface Quiz {
    quiz_name: string,
    quiz_frequency: number,
    question_list: Question[]
}

export interface QuizInfo {
    quiz_name: string,
    quiz_title: string,
    quiz_description: string,
    quiz_frequency: number,
}

export interface QuizList {
    quiz_id: number
    quiz_name: string,
}