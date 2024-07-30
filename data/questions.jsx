export default [
    {
        question: "What are the main principles of object-oriented programming (OOP)?",
        correctAnswer: "The main principles of OOP are encapsulation, abstraction, inheritance, and polymorphism. Encapsulation refers to bundling the data and methods that operate on the data within one unit, like a class. Abstraction is the concept of hiding the complex implementation details and showing only the necessary features of an object. Inheritance allows one class to inherit the properties and methods of another class. Polymorphism allows methods to do different things based on the object it is acting upon, achieved through method overriding and overloading."
    },
    {
        question: "What is the difference between a stack and a queue?",
        correctAnswer: "A stack is a data structure that follows the Last In, First Out (LIFO) principle, where the last element added is the first one to be removed. Common operations are push (add an element), pop (remove an element), and peek (retrieve the top element without removing it). A queue, on the other hand, follows the First In, First Out (FIFO) principle, where the first element added is the first one to be removed. Common operations are enqueue (add an element), dequeue (remove an element), and front (retrieve the front element without removing it)."
    },
    {
        question: "Can you explain the concept of a relational database and what SQL is used for?",
        correctAnswer: "A relational database is a type of database that stores and provides access to data points that are related to one another. Data is organized into tables, which consist of rows and columns. Each row in a table represents a record with a unique ID called the primary key, and each column represents an attribute of the data. SQL (Structured Query Language) is used to interact with relational databases. It allows for the querying, updating, inserting, and deleting of data within the database. SQL also supports functions for data management and transaction control."
    },
    {
        question: "What are some common design patterns used in software development?",
        correctAnswer: "Some common design patterns include the Singleton, Factory, Observer, Strategy, and Decorator patterns. The Singleton pattern ensures a class has only one instance and provides a global point of access to it. The Factory pattern is used to create objects without specifying the exact class of object that will be created. The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. The Decorator pattern allows behavior to be added to individual objects, dynamically, without affecting the behavior of other objects from the same class."
    },
    {
        question: "What is version control, and why is it important in software development?",
        correctAnswer: "Version control is a system that records changes to a file or set of files over time so that you can recall specific versions later. It is important in software development because it allows multiple developers to work on a project simultaneously without overwriting each other's changes. It also provides a history of changes, which can be useful for tracking bugs, understanding the evolution of the code, and reverting to previous versions if necessary. Popular version control systems include Git, Subversion (SVN), and Mercurial."
    },
    {
        question: "Explain the difference between synchronous and asynchronous programming.",
        correctAnswer: "Synchronous programming executes tasks sequentially, meaning each task must complete before the next one begins. This can lead to blocking behavior if a task takes a long time to complete. Asynchronous programming, on the other hand, allows tasks to be executed concurrently. It enables a program to continue running other tasks while waiting for an operation to complete, thus improving efficiency and responsiveness. Asynchronous programming is commonly used in scenarios like I/O operations, network requests, and user interface events."
    },
    {
        question: "What is the importance of unit testing in software development?",
        correctAnswer: "Unit testing involves testing individual components or units of a software application in isolation to ensure they work as intended. It is important because it helps identify and fix bugs early in the development process, ensures that code meets its design and behaves as expected, and facilitates refactoring by providing a safety net that verifies functionality after changes. Unit tests also serve as documentation for the code, providing examples of how it is supposed to work."
    },
    {
        question: "Describe the Agile methodology and its benefits.",
        correctAnswer: "Agile methodology is an iterative and incremental approach to software development that emphasizes flexibility, collaboration, and customer feedback. It promotes adaptive planning, evolutionary development, early delivery, and continuous improvement. Benefits of Agile include faster delivery of features, improved ability to manage changing priorities, increased team productivity, better project visibility and transparency, higher quality products, and enhanced customer satisfaction due to regular feedback and involvement."
    },
    {
        question: "What is the purpose of Continuous Integration (CI) and Continuous Deployment (CD)?",
        correctAnswer: "Continuous Integration (CI) is the practice of automatically integrating code changes from multiple contributors into a shared repository several times a day. CI involves automated testing to detect integration issues early. Continuous Deployment (CD) extends CI by automatically deploying every code change that passes the automated tests to production. The purpose of CI/CD is to improve the development process by reducing integration problems, providing faster feedback, increasing deployment frequency, and ensuring that the software is always in a deployable state."
    },
    {
        question: "Can you explain the concept of microservices architecture?",
        correctAnswer: "Microservices architecture is a design approach where an application is composed of small, loosely coupled, independently deployable services. Each service is responsible for a specific business capability and can be developed, deployed, and scaled independently. Microservices communicate with each other over well-defined APIs, often using HTTP/REST or messaging queues. This architecture offers benefits such as improved modularity, easier scaling, faster deployment cycles, and the ability to use different technologies for different services. However, it also introduces challenges such as managing distributed systems, ensuring data consistency, and handling inter-service communication and fault tolerance."
    },
    {
        question: "What is the difference between a compiler and an interpreter?",
        correctAnswer: "A compiler translates the entire source code of a program into machine code before the program is run. This process generates an executable file that can be run directly by the computer. An interpreter, on the other hand, translates the source code into machine code line-by-line and executes it directly without producing an intermediate executable file. Compilers generally provide faster execution times since the entire code is translated before execution, whereas interpreters offer more flexibility and easier debugging since they execute code line-by-line."
    },
    {
        question: "What are RESTful APIs and how do they work?",
        correctAnswer: "RESTful APIs (Representational State Transfer) are a type of web service that uses HTTP requests to perform CRUD (Create, Read, Update, Delete) operations on resources. They adhere to a set of constraints such as statelessness, a uniform interface, and client-server architecture. RESTful APIs typically use standard HTTP methods like GET, POST, PUT, DELETE, and PATCH. Resources are identified by URLs, and data is typically exchanged in JSON or XML format. RESTful APIs are widely used due to their simplicity, scalability, and ease of integration with various systems."
    },
    {
        question: "What is a race condition, and how can it be prevented?",
        correctAnswer: "A race condition occurs when the behavior of a software system depends on the timing or sequence of events, leading to unpredictable or erroneous outcomes. This often happens in concurrent or multi-threaded programs where multiple threads or processes access shared resources without proper synchronization. Race conditions can be prevented by using synchronization mechanisms such as locks, semaphores, and mutexes to ensure that only one thread or process accesses the shared resource at a time. Properly designing and testing concurrent systems can also help prevent race conditions."
    },
    {
        question: "What is the difference between an abstract class and an interface?",
        correctAnswer: "An abstract class is a class that cannot be instantiated and is meant to be subclassed. It can have both abstract methods (methods without a body) and concrete methods (methods with a body). Abstract classes are used to provide a common base for related classes and can contain fields and constructors. An interface, on the other hand, is a contract that defines a set of methods that implementing classes must provide. Interfaces cannot contain implementation code or fields, and a class can implement multiple interfaces, enabling multiple inheritance of behavior. Abstract classes are used when there is a common implementation to share among subclasses, while interfaces are used to define a common set of methods that multiple classes can implement."
    },
    {
        question: "Explain the concept of Big O notation and why it is important.",
        correctAnswer: "Big O notation is a mathematical notation used to describe the upper bound of an algorithm's time or space complexity in terms of the input size. It provides a high-level understanding of the algorithm's performance characteristics, allowing for the comparison of different algorithms independently of hardware and software environments. Big O notation is important because it helps software engineers choose the most efficient algorithm for a given problem, ensuring that the software performs well as the input size grows. Common Big O notations include O(1) for constant time, O(n) for linear time, O(log n) for logarithmic time, and O(n^2) for quadratic time."
    },
]