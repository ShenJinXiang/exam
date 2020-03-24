package com.shenjinxiang.spb.controller;

import com.shenjinxiang.spb.domain.User;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    // 创建线程安全的Map，模拟users信息的存储
    static Map<Long, User> users = Collections.synchronizedMap(new HashMap<Long, User>());

    @GetMapping("/")
    public List<User> queryAllStudent() {
        return new ArrayList<User>(users.values());
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return users.get(id);
    }

    @PostMapping("/")
    public void postUser(@RequestBody User user) {
        users.put(user.getId(), user);
    }

    @PutMapping("/{id}")
    public void putUser(@PathVariable Long id, @RequestBody User user) {
        User u = users.get(id);
        u.setName(user.getName());
        u.setAge(user.getAge());
        u.setDesc(user.getDesc());
        users.put(id, u);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        users.remove(id);
    }
}
