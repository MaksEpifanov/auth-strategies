export declare const initUsers: () => Promise<({
    login: string;
    name: string;
    password: string;
    role: "user";
} | {
    login: string;
    name: string;
    password: string;
    role: "admin";
} | {
    login: string;
    name: string;
    password: string;
    role: "owner";
})[]>;
