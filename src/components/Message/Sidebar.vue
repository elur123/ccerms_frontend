<template>
    <div class="sidebar w-full md:w-3/12 h-full border-r-2">
        <div class="header overflow-hidden flex items-center h-20 px-2">
            <h1 class="font-bold text-3xl mr-2">Chats</h1>
            <input class="flex-1 rounded-lg border-transparent focus:border-transparent focus:ring-0" type="text" placeholder="Search User">
        </div>
        <div class="chats">
            <div class="recipients flex items-center p-2 mb-3 cursor-pointer hover:bg-slate-100">
                <div class="image-wrapper w-12 h-12 rounded-full mr-3">
                    <img class="rounded-full" src="https://via.placeholder.com/150.png?text=CCERMS" alt="User profile">
                </div>
                <div class="details">
                    <h2 class="name font-bold">Profile Name</h2>
                    <p>email@gmail.com</p>
                </div>
            </div>
            <div class="recipients flex items-center p-2 mb-3 cursor-pointer hover:bg-slate-100">
                <div class="image-wrapper w-12 h-12 rounded-full mr-3">
                    <img class="rounded-full" src="https://via.placeholder.com/150.png?text=CCERMS" alt="User profile">
                </div>
                <div class="details">
                    <h2 class="name font-bold">Profile Name</h2>
                    <p>email@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
</template>