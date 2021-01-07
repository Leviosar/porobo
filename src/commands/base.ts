export default interface BaseCommand {
    callback: Function;
    name: string;
    help: string;
    usage: string;
    argc: number;
    hasRegisterParam: boolean;
}