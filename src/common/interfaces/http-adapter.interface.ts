
export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}

//Propósito de T:
//Flexibilidad: Permite que el método get trabaje con cualquier tipo de datos. Por ejemplo, T podría ser un objeto, una cadena, un número, etc.
//Reutilización: La misma interfaz y método pueden ser utilizados en diferentes contextos con diferentes tipos de datos sin necesidad de redefinir la interfaz para cada tipo.
//Seguridad de tipos: Proporciona seguridad de tipos en tiempo de compilación, asegurando que el tipo de datos esperado se maneje correctamente.